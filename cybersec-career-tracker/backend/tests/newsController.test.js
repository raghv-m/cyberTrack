const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const admin = require('firebase-admin');
const { expect } = chai;

chai.use(chaiHttp);

// Mock data
const mockNewsArticle = {
  title: 'New Cybersecurity Threat Discovered',
  url: 'https://example.com/news/threat-discovered',
  summary: 'Researchers have discovered a new cybersecurity threat targeting enterprise networks.',
  source: 'Cybersecurity News',
  publishedAt: new Date().toISOString(),
  scrapedAt: new Date().toISOString(),
  imageUrl: 'https://example.com/news/threat-image.jpg',
  tags: ['threat', 'enterprise', 'network'],
  views: 100,
  trending: true
};

describe('News Controller', () => {
  let server;
  let firestoreCollectionStub;
  let firestoreDocStub;
  let firestoreGetStub;
  let firestoreSetStub;
  let firestoreAddStub;
  let firestoreUpdateStub;
  let firestoreDeleteStub;
  let firestoreQueryStub;

  before(() => {
    // Start server
    process.env.NODE_ENV = 'test';
    server = require('../server');
  });

  after(() => {
    // Close server
    server.close();
  });

  beforeEach(() => {
    // Mock Firestore
    firestoreGetStub = sinon.stub().resolves({
      exists: true,
      data: () => mockNewsArticle
    });
    
    firestoreSetStub = sinon.stub().resolves();
    firestoreAddStub = sinon.stub().resolves({ id: 'test-article-id' });
    firestoreUpdateStub = sinon.stub().resolves();
    firestoreDeleteStub = sinon.stub().resolves();
    
    firestoreDocStub = sinon.stub().returns({
      get: firestoreGetStub,
      set: firestoreSetStub,
      update: firestoreUpdateStub,
      delete: firestoreDeleteStub
    });
    
    firestoreQueryStub = sinon.stub().returns({
      where: sinon.stub().returnsThis(),
      orderBy: sinon.stub().returnsThis(),
      limit: sinon.stub().returnsThis(),
      get: sinon.stub().resolves({
        forEach: (callback) => {
          callback({
            id: 'test-article-id',
            data: () => mockNewsArticle
          });
        },
        empty: false,
        docs: [{
          id: 'test-article-id',
          data: () => mockNewsArticle
        }]
      })
    });
    
    firestoreCollectionStub = sinon.stub(admin.firestore(), 'collection')
      .callsFake((collectionName) => {
        if (collectionName === 'newsArticles') {
          return {
            add: firestoreAddStub,
            doc: firestoreDocStub,
            where: firestoreQueryStub.where,
            orderBy: firestoreQueryStub.orderBy,
            limit: firestoreQueryStub.limit,
            get: firestoreQueryStub.get
          };
        }
        return {
          doc: firestoreDocStub
        };
      });
  });

  afterEach(() => {
    // Restore stubs
    sinon.restore();
  });

  describe('GET /api/news/latest', () => {
    it('should return latest news articles', (done) => {
      chai.request(server)
        .get('/api/news/latest')
        .query({ limit: 10 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/news/trending', () => {
    it('should return trending news articles', (done) => {
      chai.request(server)
        .get('/api/news/trending')
        .query({ limit: 5 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/news/:articleId', () => {
    it('should return specific news article', (done) => {
      chai.request(server)
        .get('/api/news/test-article-id')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.have.property('title', 'New Cybersecurity Threat Discovered');
          done();
        });
    });

    it('should return 404 when article not found', (done) => {
      // Mock article not found
      firestoreGetStub.resolves({
        exists: false
      });

      chai.request(server)
        .get('/api/news/non-existent-id')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'Not Found');
          done();
        });
    });
  });

  describe('GET /api/news/search', () => {
    it('should return search results when query provided', (done) => {
      chai.request(server)
        .get('/api/news/search')
        .query({ q: 'cybersecurity', limit: 5 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('should return 400 when no query provided', (done) => {
      chai.request(server)
        .get('/api/news/search')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Bad Request');
          done();
        });
    });
  });

  describe('GET /api/news/categories', () => {
    it('should return news categories', (done) => {
      chai.request(server)
        .get('/api/news/categories')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /api/news/refresh (Admin only)', () => {
    it('should trigger news refresh when authenticated as admin', (done) => {
      // Mock admin role
      const adminReq = {
        headers: {
          authorization: 'Bearer admin-token'
        },
        user: {
          uid: 'admin-user-id',
          roles: ['admin']
        }
      };

      chai.request(server)
        .post('/api/news/refresh')
        .set('Authorization', 'Bearer admin-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'News refresh triggered successfully');
          done();
        });
    });

    it('should return 403 when not authorized as admin', (done) => {
      chai.request(server)
        .post('/api/news/refresh')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });
  });
});
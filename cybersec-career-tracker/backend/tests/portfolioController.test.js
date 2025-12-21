const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const admin = require('firebase-admin');
const { expect } = chai;

chai.use(chaiHttp);

// Mock data
const mockPortfolioItem = {
  userId: 'test-user-id',
  type: 'project',
  title: 'Network Security Assessment',
  description: 'Performed a comprehensive network security assessment for a small business',
  dateCreated: new Date().toISOString(),
  tags: ['networking', 'security'],
  githubUrl: 'https://github.com/test/network-assessment',
  linkedinUrl: 'https://linkedin.com/in/test/network-assessment',
  content: 'Detailed writeup of the assessment process...',
  skills: ['Network Security', 'Vulnerability Assessment'],
  tools: ['Nmap', 'Wireshark'],
  verified: false,
  qualityScore: 0,
  issues: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const mockJobApplication = {
  userId: 'test-user-id',
  company: 'CyberSec Corp',
  position: 'Junior Security Analyst',
  applicationDate: new Date().toISOString(),
  status: 'applied',
  notes: 'Applied through company website',
  documents: ['resume.pdf', 'cover-letter.pdf'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

describe('Portfolio Controller', () => {
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
      data: () => mockPortfolioItem
    });
    
    firestoreSetStub = sinon.stub().resolves();
    firestoreAddStub = sinon.stub().resolves({ id: 'test-item-id' });
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
            id: 'test-item-id',
            data: () => mockPortfolioItem
          });
        },
        empty: false,
        docs: [{
          id: 'test-item-id',
          data: () => mockPortfolioItem
        }]
      })
    });
    
    firestoreCollectionStub = sinon.stub(admin.firestore(), 'collection')
      .callsFake((collectionName) => {
        if (collectionName === 'portfolioItems' || collectionName === 'jobApplications') {
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

  describe('POST /api/portfolio/items', () => {
    it('should add portfolio item when authenticated', (done) => {
      const itemData = {
        type: 'project',
        title: 'Network Security Assessment',
        description: 'Performed a comprehensive network security assessment',
        tags: ['networking', 'security'],
        githubUrl: 'https://github.com/test/network-assessment'
      };

      chai.request(server)
        .post('/api/portfolio/items')
        .set('Authorization', 'Bearer valid-token')
        .send(itemData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Portfolio item added successfully');
          done();
        });
    });

    it('should return 400 when validation fails', (done) => {
      const invalidData = {
        type: 'invalid-type', // Invalid type should fail validation
        title: 'Network Security Assessment',
        description: 'Performed a comprehensive network security assessment'
      };

      chai.request(server)
        .post('/api/portfolio/items')
        .set('Authorization', 'Bearer valid-token')
        .send(invalidData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Bad Request');
          done();
        });
    });
  });

  describe('PUT /api/portfolio/items/:itemId', () => {
    it('should update portfolio item when authenticated', (done) => {
      const updateData = {
        title: 'Updated Network Security Assessment',
        description: 'Enhanced description with more details'
      };

      chai.request(server)
        .put('/api/portfolio/items/test-item-id')
        .set('Authorization', 'Bearer valid-token')
        .send(updateData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Portfolio item updated successfully');
          done();
        });
    });

    it('should return 404 when item not found', (done) => {
      // Mock item not found
      firestoreGetStub.resolves({
        exists: false
      });

      const updateData = {
        title: 'Updated Network Security Assessment'
      };

      chai.request(server)
        .put('/api/portfolio/items/non-existent-id')
        .set('Authorization', 'Bearer valid-token')
        .send(updateData)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'Not Found');
          done();
        });
    });
  });

  describe('GET /api/portfolio/items', () => {
    it('should return user portfolio items when authenticated', (done) => {
      chai.request(server)
        .get('/api/portfolio/items')
        .set('Authorization', 'Bearer valid-token')
        .query({ limit: 10 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/portfolio/items/:itemId', () => {
    it('should return specific portfolio item when authenticated', (done) => {
      chai.request(server)
        .get('/api/portfolio/items/test-item-id')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.have.property('title', 'Network Security Assessment');
          done();
        });
    });

    it('should return 404 when item not found', (done) => {
      // Mock item not found
      firestoreGetStub.resolves({
        exists: false
      });

      chai.request(server)
        .get('/api/portfolio/items/non-existent-id')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'Not Found');
          done();
        });
    });
  });

  describe('DELETE /api/portfolio/items/:itemId', () => {
    it('should delete portfolio item when authenticated', (done) => {
      chai.request(server)
        .delete('/api/portfolio/items/test-item-id')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Portfolio item deleted successfully');
          done();
        });
    });

    it('should return 404 when item not found', (done) => {
      // Mock item not found
      firestoreGetStub.resolves({
        exists: false
      });

      chai.request(server)
        .delete('/api/portfolio/items/non-existent-id')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'Not Found');
          done();
        });
    });
  });

  describe('POST /api/portfolio/applications', () => {
    it('should add job application when authenticated', (done) => {
      const appData = {
        company: 'CyberSec Corp',
        position: 'Junior Security Analyst',
        status: 'applied',
        notes: 'Applied through company website'
      };

      chai.request(server)
        .post('/api/portfolio/applications')
        .set('Authorization', 'Bearer valid-token')
        .send(appData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Job application added successfully');
          done();
        });
    });

    it('should return 400 when validation fails', (done) => {
      const invalidData = {
        company: '', // Empty company should fail validation
        position: 'Junior Security Analyst'
      };

      chai.request(server)
        .post('/api/portfolio/applications')
        .set('Authorization', 'Bearer valid-token')
        .send(invalidData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Bad Request');
          done();
        });
    });
  });

  describe('PUT /api/portfolio/applications/:appId', () => {
    it('should update job application when authenticated', (done) => {
      const updateData = {
        status: 'interviewing',
        notes: 'Phone interview scheduled for next week'
      };

      chai.request(server)
        .put('/api/portfolio/applications/test-app-id')
        .set('Authorization', 'Bearer valid-token')
        .send(updateData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Job application updated successfully');
          done();
        });
    });
  });

  describe('GET /api/portfolio/applications', () => {
    it('should return user job applications when authenticated', (done) => {
      chai.request(server)
        .get('/api/portfolio/applications')
        .set('Authorization', 'Bearer valid-token')
        .query({ limit: 10 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/portfolio/applications/:appId', () => {
    it('should return specific job application when authenticated', (done) => {
      chai.request(server)
        .get('/api/portfolio/applications/test-app-id')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.have.property('company', 'CyberSec Corp');
          done();
        });
    });
  });

  describe('DELETE /api/portfolio/applications/:appId', () => {
    it('should delete job application when authenticated', (done) => {
      chai.request(server)
        .delete('/api/portfolio/applications/test-app-id')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Job application deleted successfully');
          done();
        });
    });
  });
});
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const admin = require('firebase-admin');
const { expect } = chai;

chai.use(chaiHttp);

// Mock Firebase Admin
const mockUserRecord = {
  uid: 'test-user-id',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: 'https://example.com/photo.jpg',
  metadata: {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString()
  }
};

const mockUserData = {
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: 'https://example.com/photo.jpg',
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString()
};

describe('User Controller', () => {
  let server;
  let getUserStub;
  let updateUserStub;
  let listUsersStub;
  let setCustomUserClaimsStub;
  let firestoreCollectionStub;
  let firestoreDocStub;
  let firestoreGetStub;
  let firestoreSetStub;
  let firestoreUpdateStub;

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
    // Reset stubs
    getUserStub = sinon.stub(admin.auth(), 'getUser').resolves(mockUserRecord);
    updateUserStub = sinon.stub(admin.auth(), 'updateUser').resolves(mockUserRecord);
    listUsersStub = sinon.stub(admin.auth(), 'listUsers').resolves({ users: [mockUserRecord], pageToken: null });
    setCustomUserClaimsStub = sinon.stub(admin.auth(), 'setCustomUserClaims').resolves();
    
    // Mock Firestore
    firestoreGetStub = sinon.stub().resolves({
      exists: true,
      data: () => mockUserData
    });
    
    firestoreSetStub = sinon.stub().resolves();
    firestoreUpdateStub = sinon.stub().resolves();
    
    firestoreDocStub = sinon.stub().returns({
      get: firestoreGetStub,
      set: firestoreSetStub,
      update: firestoreUpdateStub
    });
    
    firestoreCollectionStub = sinon.stub(admin.firestore(), 'collection').returns({
      doc: firestoreDocStub,
      get: sinon.stub().resolves({
        forEach: (callback) => callback({
          id: 'test-user-id',
          data: () => mockUserData
        })
      })
    });
  });

  afterEach(() => {
    // Restore stubs
    sinon.restore();
  });

  describe('GET /api/users/profile', () => {
    it('should return user profile when authenticated', (done) => {
      chai.request(server)
        .get('/api/users/profile')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.have.property('email', 'test@example.com');
          done();
        });
    });

    it('should return 401 when not authenticated', (done) => {
      chai.request(server)
        .get('/api/users/profile')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe('PUT /api/users/profile', () => {
    it('should update user profile when authenticated', (done) => {
      const updateData = {
        displayName: 'Updated Test User',
        photoURL: 'https://example.com/new-photo.jpg'
      };

      chai.request(server)
        .put('/api/users/profile')
        .set('Authorization', 'Bearer valid-token')
        .send(updateData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Profile updated successfully');
          done();
        });
    });

    it('should return 400 when validation fails', (done) => {
      const invalidData = {
        displayName: '' // Empty display name should fail validation
      };

      chai.request(server)
        .put('/api/users/profile')
        .set('Authorization', 'Bearer valid-token')
        .send(invalidData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Bad Request');
          done();
        });
    });
  });

  describe('GET /api/users/preferences', () => {
    it('should return user preferences when authenticated', (done) => {
      chai.request(server)
        .get('/api/users/preferences')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });

  describe('PUT /api/users/preferences', () => {
    it('should update user preferences when authenticated', (done) => {
      const preferences = {
        emailNotifications: false,
        dailyReminders: true,
        theme: 'dark'
      };

      chai.request(server)
        .put('/api/users/preferences')
        .set('Authorization', 'Bearer valid-token')
        .send(preferences)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Preferences updated successfully');
          done();
        });
    });
  });

  describe('GET /api/users (Admin only)', () => {
    it('should return all users when authenticated as admin', (done) => {
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
        .get('/api/users')
        .set('Authorization', 'Bearer admin-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('should return 403 when not authorized as admin', (done) => {
      chai.request(server)
        .get('/api/users')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });
  });

  describe('PUT /api/users/role (Admin only)', () => {
    it('should update user role when authenticated as admin', (done) => {
      const roleData = {
        userId: 'target-user-id',
        roles: ['admin']
      };

      chai.request(server)
        .put('/api/users/role')
        .set('Authorization', 'Bearer admin-token')
        .send(roleData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'User role updated successfully');
          done();
        });
    });

    it('should return 400 when validation fails', (done) => {
      const invalidData = {
        userId: '', // Empty user ID should fail validation
        roles: ['admin']
      };

      chai.request(server)
        .put('/api/users/role')
        .set('Authorization', 'Bearer admin-token')
        .send(invalidData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Bad Request');
          done();
        });
    });
  });
});
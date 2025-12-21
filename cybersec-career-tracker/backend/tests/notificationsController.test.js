const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const admin = require('firebase-admin');
const { expect } = chai;

chai.use(chaiHttp);

// Mock data
const mockNotification = {
  userId: 'test-user-id',
  title: 'New Message',
  message: 'You have a new message',
  type: 'info',
  data: {},
  read: false,
  createdAt: new Date().toISOString()
};

describe('Notifications Controller', () => {
  let server;
  let firestoreCollectionStub;
  let firestoreDocStub;
  let firestoreGetStub;
  let firestoreSetStub;
  let firestoreAddStub;
  let firestoreUpdateStub;
  let firestoreDeleteStub;
  let firestoreQueryStub;
  let messagingSendStub;

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
      data: () => mockNotification
    });
    
    firestoreSetStub = sinon.stub().resolves();
    firestoreAddStub = sinon.stub().resolves({ id: 'test-notification-id' });
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
            id: 'test-notification-id',
            data: () => mockNotification
          });
        },
        empty: false,
        size: 1,
        docs: [{
          id: 'test-notification-id',
          data: () => mockNotification,
          ref: {
            update: firestoreUpdateStub
          }
        }]
      })
    });
    
    firestoreCollectionStub = sinon.stub(admin.firestore(), 'collection')
      .callsFake((collectionName) => {
        if (collectionName === 'notifications') {
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
    
    // Mock Firebase Messaging
    messagingSendStub = sinon.stub().resolves('test-message-id');
    sinon.stub(admin, 'messaging').returns({
      send: messagingSendStub
    });
  });

  afterEach(() => {
    // Restore stubs
    sinon.restore();
  });

  describe('POST /api/notifications/send (Admin only)', () => {
    it('should send notification when authenticated as admin', (done) => {
      const notificationData = {
        userId: 'target-user-id',
        title: 'Test Notification',
        message: 'This is a test notification',
        type: 'info'
      };

      chai.request(server)
        .post('/api/notifications/send')
        .set('Authorization', 'Bearer admin-token')
        .send(notificationData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Notification sent successfully');
          done();
        });
    });

    it('should return 400 when validation fails', (done) => {
      const invalidData = {
        userId: '', // Empty user ID should fail validation
        title: 'Test Notification',
        message: 'This is a test notification'
      };

      chai.request(server)
        .post('/api/notifications/send')
        .set('Authorization', 'Bearer admin-token')
        .send(invalidData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Bad Request');
          done();
        });
    });
  });

  describe('GET /api/notifications', () => {
    it('should return user notifications when authenticated', (done) => {
      chai.request(server)
        .get('/api/notifications')
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

  describe('PUT /api/notifications/:notificationId/read', () => {
    it('should mark notification as read when authenticated', (done) => {
      chai.request(server)
        .put('/api/notifications/test-notification-id/read')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Notification marked as read');
          done();
        });
    });

    it('should return 404 when notification not found', (done) => {
      // Mock notification not found
      firestoreGetStub.resolves({
        exists: false
      });

      chai.request(server)
        .put('/api/notifications/non-existent-id/read')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'Not Found');
          done();
        });
    });
  });

  describe('PUT /api/notifications/read-all', () => {
    it('should mark all notifications as read when authenticated', (done) => {
      chai.request(server)
        .put('/api/notifications/read-all')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('DELETE /api/notifications/:notificationId', () => {
    it('should delete notification when authenticated', (done) => {
      chai.request(server)
        .delete('/api/notifications/test-notification-id')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Notification deleted successfully');
          done();
        });
    });

    it('should return 404 when notification not found', (done) => {
      // Mock notification not found
      firestoreGetStub.resolves({
        exists: false
      });

      chai.request(server)
        .delete('/api/notifications/non-existent-id')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'Not Found');
          done();
        });
    });
  });

  describe('GET /api/notifications/stats', () => {
    it('should return notification statistics when authenticated', (done) => {
      chai.request(server)
        .get('/api/notifications/stats')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.have.property('unreadCount');
          done();
        });
    });
  });
});
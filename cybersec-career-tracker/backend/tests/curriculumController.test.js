const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const admin = require('firebase-admin');
const OpenAI = require('openai');
const { expect } = chai;

chai.use(chaiHttp);

// Mock data
const mockCurriculumData = {
  currentTier: 'beginner',
  targetTier: 'tier1',
  startDate: new Date().toISOString(),
  hoursPerWeek: 10,
  existingSkills: ['networking basics'],
  milestones: [],
  customGoals: [],
  generatedCurriculum: {
    generatedAt: new Date().toISOString(),
    phases: [
      {
        phaseNumber: 1,
        phaseName: 'Foundation Phase',
        startWeek: 1,
        endWeek: 4,
        skills: ['Networking Fundamentals', 'OSI Model'],
        tools: ['Wireshark', 'Nmap'],
        labs: ['Network Scanning Lab'],
        certifications: ['CompTIA Network+'],
        weeklyHours: 10,
        aiRecommendations: ['Focus on hands-on labs']
      }
    ],
    totalWeeks: 20,
    personalizedAdvice: 'Consistent practice is key'
  }
};

const mockDailyLogData = {
  userId: 'test-user-id',
  date: '2023-12-01',
  theoryHours: 2,
  handsOnHours: 3,
  toolsUsed: ['Wireshark'],
  labsCompleted: ['Packet Analysis Lab'],
  notes: 'Learned about TCP/IP protocols',
  evidence: ['screenshot1.png'],
  createdAt: new Date().toISOString()
};

describe('Curriculum Controller', () => {
  let server;
  let openaiMock;
  let firestoreCollectionStub;
  let firestoreDocStub;
  let firestoreGetStub;
  let firestoreSetStub;
  let firestoreAddStub;
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
    // Mock OpenAI
    openaiMock = sinon.createStubInstance(OpenAI);
    openaiMock.chat.completions.create.resolves({
      choices: [{
        message: {
          content: JSON.stringify({
            phases: [
              {
                phaseNumber: 1,
                phaseName: 'Foundation Phase',
                startWeek: 1,
                endWeek: 4,
                skills: ['Networking Fundamentals'],
                tools: ['Wireshark'],
                labs: ['Packet Analysis Lab'],
                certifications: ['CompTIA Network+'],
                weeklyHours: 10,
                aiRecommendations: ['Focus on hands-on practice']
              }
            ],
            totalWeeks: 20,
            personalizedAdvice: 'Consistent practice is key'
          })
        }
      }]
    });

    // Store original OpenAI instance
    const originalOpenAI = require('openai');
    
    // Mock Firestore
    firestoreGetStub = sinon.stub().resolves({
      exists: true,
      data: () => mockCurriculumData
    });
    
    firestoreSetStub = sinon.stub().resolves();
    firestoreAddStub = sinon.stub().resolves({ id: 'test-log-id' });
    
    firestoreDocStub = sinon.stub().returns({
      get: firestoreGetStub,
      set: firestoreSetStub
    });
    
    firestoreQueryStub = sinon.stub().returns({
      where: sinon.stub().returnsThis(),
      orderBy: sinon.stub().returnsThis(),
      limit: sinon.stub().returnsThis(),
      get: sinon.stub().resolves({
        forEach: (callback) => {
          callback({
            id: 'test-log-id',
            data: () => mockDailyLogData
          });
        },
        empty: false,
        docs: [{
          id: 'test-log-id',
          data: () => mockDailyLogData
        }]
      })
    });
    
    firestoreCollectionStub = sinon.stub(admin.firestore(), 'collection')
      .callsFake((collectionName) => {
        if (collectionName === 'userGoals') {
          return {
            doc: firestoreDocStub
          };
        } else if (collectionName === 'dailyLogs') {
          return {
            add: firestoreAddStub,
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

  describe('POST /api/curriculum/generate', () => {
    it('should generate curriculum when authenticated', (done) => {
      const requestData = {
        currentLevel: 'beginner',
        targetTier: 'tier1',
        hoursPerWeek: 10,
        existingSkills: ['networking basics']
      };

      chai.request(server)
        .post('/api/curriculum/generate')
        .set('Authorization', 'Bearer valid-token')
        .send(requestData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Curriculum generated successfully');
          expect(res.body.data).to.have.property('phases');
          expect(res.body.data.phases).to.be.an('array');
          done();
        });
    });

    it('should return 400 when validation fails', (done) => {
      const invalidData = {
        currentLevel: 'invalid-level', // Invalid level should fail validation
        targetTier: 'tier1',
        hoursPerWeek: 10
      };

      chai.request(server)
        .post('/api/curriculum/generate')
        .set('Authorization', 'Bearer valid-token')
        .send(invalidData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Bad Request');
          done();
        });
    });
  });

  describe('GET /api/curriculum', () => {
    it('should return current curriculum when authenticated', (done) => {
      chai.request(server)
        .get('/api/curriculum')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body.data).to.have.property('currentTier', 'beginner');
          done();
        });
    });

    it('should return 404 when no curriculum exists', (done) => {
      // Mock no curriculum found
      firestoreGetStub.resolves({
        exists: false
      });

      chai.request(server)
        .get('/api/curriculum')
        .set('Authorization', 'Bearer valid-token')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'Not Found');
          done();
        });
    });
  });

  describe('POST /api/curriculum/logs', () => {
    it('should log daily progress when authenticated', (done) => {
      const logData = {
        date: '2023-12-01',
        theoryHours: 2,
        handsOnHours: 3,
        toolsUsed: ['Wireshark'],
        labsCompleted: ['Packet Analysis Lab'],
        notes: 'Learned about TCP/IP protocols'
      };

      chai.request(server)
        .post('/api/curriculum/logs')
        .set('Authorization', 'Bearer valid-token')
        .send(logData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Daily progress logged successfully');
          done();
        });
    });

    it('should return 400 when validation fails', (done) => {
      const invalidData = {
        date: 'invalid-date', // Invalid date should fail validation
        theoryHours: 2,
        handsOnHours: 3
      };

      chai.request(server)
        .post('/api/curriculum/logs')
        .set('Authorization', 'Bearer valid-token')
        .send(invalidData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Bad Request');
          done();
        });
    });
  });

  describe('GET /api/curriculum/logs', () => {
    it('should return daily logs when authenticated', (done) => {
      chai.request(server)
        .get('/api/curriculum/logs')
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
});
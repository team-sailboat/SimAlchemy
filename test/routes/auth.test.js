require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Teacher = require('../../lib/models/Teacher');

const createTeacher = (username, password) => {
  return Teacher.create({
    username,
    password
  });
};

describe('auth', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });
  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  it('can signup a new teacher and include token', () => {
    const teacher = { username: 'cari', password: 'pizza' };
    return request(app)
      .post('/auth/signup')
      .send(teacher)
      .then(res => {
        expect(res.body).toEqual({
          teacher: {
            username: 'cari',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });

  it('can signin a teacher', () => {
    return createTeacher('teonna', 'password')
      .then(teacher => {
        return request(app)
          .post('/auth/signin')
          .send({ username: 'teonna', password: 'password' })
          .then(res => {
            expect(res.body).toEqual({ 
              foundTeacher: {
                username: 'teonna',
                _id: teacher._id.toString()
              },
              token: expect.any(String)
            });
          });
      });
  });

  it('can NOT signin user if bad password', () => {
    return createTeacher('booboo3000', 'b4ckFrumZeDad')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'booboo3000',
            password: 'hacker4life'
          })
          .then(res => {
            expect(res.status).toEqual(401);
            expect(res.body).toEqual({ error: 'Bad username or password' });
          });
      });
  });

  it('can NOT signin user if username not a match', () => {
    return createTeacher('nancyRaegan', '123security')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'ronaldMcDonald',
            password: '123security'
          })
          .then(res => {
            expect(res.status).toEqual(401);
            expect(res.body).toEqual({ error: 'Bad username or password' });
          });
      });
  });

  it('can verify a route', () => {
    return createTeacher('drunkTeonna', '#blazed')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'drunkTeonna',
            password: '#blazed'
          })
          .then(res => res.body.token);
      })
      .then(token => {
        return request(app)
          .get('/auth/verify')
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          username: 'drunkTeonna',
          _id: expect.any(String)
        });
      });
  });
});


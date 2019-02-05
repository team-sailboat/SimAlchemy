const { getTeacher } = require('../dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');

describe('auth', () => {
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
    return getTeacher()
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ username: 'teacher1', password: 'sailboatz' })
          .then(res => {
            expect(res.body).toEqual({ 
              foundTeacher: {
                username: 'teacher1',
                _id: expect.any(String)
              },
              token: expect.any(String)
            });
          });
      });
  });

  it('can NOT signin user if bad password', () => {
    return getTeacher()
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'teacher1',
            password: 'sailbutz'
          })
          .then(res => {
            expect(res.status).toEqual(401);
            expect(res.body).toEqual({ error: 'Bad username or password' });
          });
      });
  });

  it('can NOT signin user if username not a match', () => {
    return getTeacher()
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'teacher123',
            password: 'sailboatz'
          })
          .then(res => {
            expect(res.status).toEqual(401);
            expect(res.body).toEqual({ error: 'Bad username or password' });
          });
      });
  });

  it('can verify a route', () => {
    return getTeacher()
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'teacher1',
            password: 'sailboatz'
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
          username: 'teacher1',
          _id: expect.any(String)
        });
      });
  });
});


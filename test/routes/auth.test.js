require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
// const Teacher = require('../../lib/models/Teacher');

// const createTeacher = (username, password) => {
//   return Teacher.create({
//     username,
//     password
//   });
// };

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
});

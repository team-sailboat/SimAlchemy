require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Teacher = require('../lib/models/Teacher');
const request = require('supertest');
const app = require('../lib/app');

beforeAll(() => {
  connect();
});

beforeEach(done => {
  mongoose.connection.dropDatabase(done);
});

beforeEach(() => {
  return seedData({ totalTeachers: 3 });
});

let token;
beforeEach(() => {
  return Teacher.findOne({ username: 'teacher1' })
    .then(teacher => {
      return request(app)
        .post('/auth/signin')
        .send({
          username: teacher.username,
          password: 'sailboatz'
        });
    })
    .then(res => {
      token = res.body.token;
    });
});

afterAll(done => {
  mongoose.connection.close(done);
});

module.exports = {
  getToken: () => token
};

require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Teacher = require('../lib/models/Teacher');
const Cohort = require('../lib/models/Cohort');
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

const prepare = model => JSON.parse(JSON.stringify(model));
const prepareAll = models => models.map(prepare);
const createGetters = Model => {
  return {
    [`get${Model.modelName}`]: (query = {}) => Model.findOne(query).then(prepare),
    [`get${Model.modelName}s`]: (query = {}) => Model.find(query).then(prepareAll)
  };
};

module.exports = {
  getToken: () => token,
  ...createGetters(Teacher),
  ...createGetters(Cohort)
};

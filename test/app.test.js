require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('app', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });
  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  it('errors when tries to get bad path', () => {
    return request(app)
      .get('/butter')
      .then(res => {
        expect(res.status).toEqual(404);
        expect(res.body).toEqual({ error: 'Sorry, /butter was not found!' });
      });
  });

  it('can return a homepage message', done => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.status).toEqual(200);
        // expect(res.text).toEqual('Welcome to Team Sailboat\'s SimAlchemy App');
        done();
      });
  });
});

const request = require('supertest');
const app = require('../../lib/app');
const {
  getTeacher,
  getToken,
  getCohorts,
  getCohort
} = require('../dataHelpers');
// const mongoose = require('mongoose');

describe('cohorts', () => {
  it('can post a cohort', () => {
    let stress, sleep, knowledge; // use defaults
    return getTeacher()
      .then(teacher => {
        return request(app)
          .post('/cohorts')
          .send({
            teacher: teacher._id,
            stress,
            sleep,
            knowledge
          })
          .set('Authorization', `Bearer ${getToken()}`)
          .then(res => {
            expect(res.body).toEqual({
              teacher: expect.any(String),
              stress: 0,
              sleep: 100,
              knowledge: 25,
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('can get all cohorts', () => {
    return request(app)
      .get('/cohorts')
      .set('Authorization', `Bearer ${getToken()}`)
      .then(res => {
        return Promise.all([
          Promise.resolve(res.body),
          getCohorts()
        ]);
      })
      .then(([body, cohorts]) => {
        expect(body).toHaveLength(cohorts.length);
      });
  });

  it('can get a cohort by id', () => {
    return getCohort()
      .then(foundCohort => {
        return request(app)
          .get(`/cohorts/${foundCohort._id}`)
          .set('Authorization', `Bearer ${getToken()}`);
      })
      .then(res => {
        expect(res.body).toEqual({ stress: expect.any(Number),
          sleep: expect.any(Number),
          knowledge: expect.any(Number),
          teacher: { 
            _id: expect.any(String), 
            username: expect.any(String) } 
        });
      });
  });
  
  it('can update a cohort', () => {
    return getCohort()
      .then(cohort => {
        return request(app)
          .patch(`/cohorts/${cohort._id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .send({ sleep: 0, knowledge: 50, stress: 6 });
      })
      .then(res => {
        expect(res.body).toEqual({ stress: 6,
          sleep: 0,
          knowledge: 50,
          teacher: { 
            _id: expect.any(String), 
            username: expect.any(String) } });
      });
  });
});

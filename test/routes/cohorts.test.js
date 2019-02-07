const request = require('supertest');
const app = require('../../lib/app');
const {
  getTeacher,
  getToken,
  getCohorts,
  getCohort
} = require('../dataHelpers');

describe('cohorts', () => {
  it('can post a cohort', () => {
    let stress, sleep, knowledge; 
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
              stress: 25,
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
          .set('Authorization', `Bearer ${getToken()}`)
          .then(res => {
            expect(res.body).toEqual({
              _id: foundCohort._id,
              stress: expect.any(Number),
              sleep: expect.any(Number),
              assignments: expect.any(Array),
              knowledge: expect.any(Number),
              teacher: { 
                _id: expect.any(String), 
                username: expect.any(String) } 
            });
          });
      });
  });
});

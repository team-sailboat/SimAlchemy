const request = require('supertest');
const app = require('../../lib/app');
const {
  getTeacher,
  getToken,
  getCohorts
} = require('../dataHelpers');

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
});

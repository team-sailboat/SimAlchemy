const request = require('supertest');
const app = require('../../lib/app');
const { getTeacher, getToken } = require('../dataHelpers');

describe('cohorts', () => {
  it('can post a cohort', () => {
    return getTeacher()
      .then(teacher => {
        return request(app)
          .post('/cohorts')
          .set('Authorization', `Bearer ${getToken()}`)
          .send({
            teacher: teacher._id,
            stress: 100,
            sleep: 0,
            knowledge: 6
          })
          .then(res => {
            console.log(res.body);
            expect(res.body).toEqual({
              teacher: expect.any(String),
              stress: 100,
              sleep: 0,
              knowledge: 6,
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });
});

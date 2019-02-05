const request = require('supertest');
const app = require('../../lib/app');
const { getToken, getCohort } = require('../dataHelpers');

describe('assignments', () => {
  it('can post an assignment', () => {
    return getCohort()
      .then(cohort => {
        return request(app)
          .post('/assignments')
          .set('Authorization', `Bearer ${getToken()}`)
          .send({
            cohortId: cohort._id,
            name: 'lab',
            difficulty: 'hard',
            travis: 'true'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          cohortId: expect.any(String),
          name: 'lab',
          difficulty: 'hard',
          travis: true,
          __v: 0
        });
      });
  });
});

const request = require('supertest');
const app = require('../../lib/app');
const { getToken, getCohort, getAssignment } = require('../dataHelpers');

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
            travis: 50
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          cohortId: expect.any(String),
          name: 'lab',
          difficulty: 'hard',
          travis: 50,
          __v: 0
        });
      });
  });

  it('can get a list of assignments', () => {
    return request(app)
      .get('/assignments')
      .then(res => {
        expect(res.body).toHaveLength(18);
      });
  });

  it('can get an assignment by id', () => {
    return getAssignment()
      .then(assign => {
        return request(app)
          .get(`/assignments/${assign._id}`)
          .then(res => {
            expect(res.body).toEqual({
              cohortId: expect.any(String),
              difficulty: expect.any(String),
              name: expect.any(String),
              travis: expect.any(Number)
            });
          });
      });
  });
});

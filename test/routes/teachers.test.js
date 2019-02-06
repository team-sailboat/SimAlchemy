const { getTeacher, getToken } = require('../dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');
// const mongoose = require('mongoose');

describe('teachers', () => {
  it('can get a list of cohorts for a specific teacher', () => {
    return getTeacher()
      .then(teacher => {
        return request(app)
          .get(`/teachers/${teacher._id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .then(res => {
            expect(res.body).toEqual(expect.any(Array));
            // expect(res.body).toContain({
            //   teacher: teacher._id
            // });
          });
      });
  });
});

require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { getTeacher } = require('../dataHelpers');
const Cohort = require('../../lib/models/Cohort');

describe('Cohort', () => {
  it('validates a good model', async() => {
    const teacher = await getTeacher();
    const cohort = new Cohort({
      teacher: teacher._id,
      stress: 0,
      sleep: 100,
      knowledge: 25
    });
    console.log(typeof cohort._id);
    expect(cohort.toJSON()).toEqual({ stress: 0,
      sleep: 100,
      knowledge: 25,
      _id: expect.any(Object),
      teacher: expect.any(mongoose.Types.ObjectId) });
  });
});

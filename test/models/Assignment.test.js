const mongoose = require('mongoose');
const Assignment = require('../../lib/models/Assignment');
const { getTeacher, getCohort } = require('../dataHelpers');

describe('Assignment Model', () => {

  it('validates a good model', async() => {
    const teacher = await getTeacher();
    const cohort = await getCohort({ teacher: teacher._id });
    const assignment = new Assignment({
      cohortId: cohort._id,
      name: 'lab',
      difficulty: 'hard',
      travis: 50
    });
    expect(assignment.toJSON()).toEqual({
      _id: expect.any(Object),
      cohortId: expect.any(mongoose.Types.ObjectId),
      name: 'lab',
      difficulty: 'hard',
      travis: 50
    });
  });

});

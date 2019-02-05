require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Assignment = require('../../lib/models/Assignment');

// const createAssignment = (name, difficulty) => {
//   return Assignment.create({
//     name,
//     difficulty
//   });
// };

describe('Assignment Model', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });
  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  it('validates a good model', () => {
    const assignment = new Assignment({
      name: 'lab',
      difficulty: 'hard'
    });
    expect(assignment.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'lab',
      difficulty: 'hard'
    });
  });

});


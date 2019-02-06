const Teacher = require('../lib/models/Teacher');
const Assignment = require('../lib/models/Assignment');
const Cohort = require('../lib/models/Cohort');
const Chance = require('chance');

const chance = new Chance();

const TOTAL_TEACHERS = 5;
const TOTAL_COHORTS = 15;
const TOTAL_ASSIGNMENTS = 30;

module.exports = ({
  totalTeachers = TOTAL_TEACHERS,
  totalCohorts = TOTAL_COHORTS,
  totalAssignments = TOTAL_ASSIGNMENTS
}) => {
  return Promise.all([...Array(totalTeachers)].map((el, idx) => {
    return Teacher.create({
      username: `teacher${idx}`,
      password: 'sailboatz'
    });
  }))
    .then(teachers => {
      return Promise.all([...Array(totalCohorts)].map(() => {
        return Cohort.create({
          teacher: chance.pickone(teachers)._id,
          stress: chance.integer({ min: 0, max: 10 }),
          sleep: chance.integer({ min: 0, max: 100 }),
          knowledge: chance.integer({ min: 0, max: 100 })
        });
      }))
        .then(cohorts => {
          return Promise.all([...Array(totalAssignments)].map(() => {
            return Assignment.create({
              cohortId: chance.pickone(cohorts)._id,
              name: chance.pickone(['Lab', 'Reading', 'Lecture']),
              difficulty: chance.pickone(['Easy', 'Medium', 'Hard']),
              travis: chance.pickone([true, false])
            });
          }));
        });
    });
};


const Teacher = require('../lib/models/Teacher');
// const Chance = require('chance');

// const chance = new Chance();

const TOTAL_TEACHERS = 5;

module.exports = ({ totalTeachers = TOTAL_TEACHERS }) => {
  return Promise.all([...Array(totalTeachers)].map((el, idx) => {
    return Teacher.create({
      username: `teacher${idx}`,
      password: 'sailboatz'
    });
  }));
};

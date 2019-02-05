const { Router } = require('express');
const Cohort = require('../../lib/models/Cohort');
const { ensureAuth } = require('../middleware/ensureTeacher');

const cohorts = Router()

  .post('/', ensureAuth, (req, res, next) => {
    const { teacher, stress, knowledge, sleep } = req.body;
    Cohort
      .create({ teacher, stress, knowledge, sleep })
      .then(cohort => res.send(cohort))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Cohort
      .find()
      .populate('teacher', { username: true })
      .select('-__v -_id')
      .then(cohorts => res.send(cohorts))
      .catch(next);
  });

module.exports = cohorts;

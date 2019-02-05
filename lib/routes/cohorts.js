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
  });

module.exports = cohorts;

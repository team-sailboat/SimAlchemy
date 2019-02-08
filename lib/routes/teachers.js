const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureTeacher');
const Cohort = require('../models/Cohort');

const teachers = Router()
  .get('/:id', ensureAuth, (req, res, next) => {
    Cohort
      .find({ teacher: req.params.id })
      .then(cohorts => res.send(cohorts))
      .catch(next);
  });

module.exports = teachers;

const { Router } = require('express');
const Cohort = require('../../lib/models/Cohort');
const Assignment = require('../../lib/models/Assignment');
const { ensureAuth } = require('../middleware/ensureTeacher');
const { HttpError } = require('../middleware/error');

const cohorts = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { teacher, stress, knowledge, sleep } = req.body;
    Cohort
      .create({ teacher, stress, knowledge, sleep })
      .then(cohort => res.send(cohort))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    Cohort
      .find()
      .populate('teacher', { username: true })
      .select('-__v -_id')
      .then(cohorts => res.send(cohorts))
      .catch(next);
  })
  .get('/:id', ensureAuth, (req, res, next) => {
    return Promise.all([
      Cohort
        .findById(req.params.id)
        .populate('teacher', { username: true })
        .select('-__v')
        .lean(),
      Assignment
        .find({ cohortId: req.params.id })
        .select('-__v -_id')
    ])
      .then(([foundCohort, assignments]) => {
        if(!foundCohort) {
          return next(new HttpError(404, `Cohort id: ${foundCohort._id} not found`));
        }
        res.send({ ...foundCohort, assignments });
      })
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    const { sleep, knowledge, stress } = req.body;
    Cohort
      .findByIdAndUpdate(req.params.id, { sleep, knowledge, stress }, { new: true })
      .populate('teacher', { username: true })
      .select('-__v -_id')
      .then(updatedCohort => res.send(updatedCohort))
      .catch(next);
  });

module.exports = cohorts;

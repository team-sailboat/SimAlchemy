const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureTeacher');
const { HttpError } = require('../middleware/error');
const Cohort = require('../../lib/models/Cohort');
const Assignment = require('../../lib/models/Assignment');

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
        if(foundCohort) {
          res.send({ ...foundCohort, assignments });
        } 
        else {
          return next(new HttpError(404, `Cohort id: ${foundCohort._id} not found`));
        }
      })
      .catch(next);
  })
  .get('/:id/travis', (req, res, next) => {
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
      .then(([foundCohort, foundAssigns]) => {
        if(foundCohort || foundAssigns) {
          Assignment
            .getTravis(foundCohort._id)
            .then(foundA => res.send(foundA))
            .catch(next);
        }
        else {
          return next(new HttpError(404, `Cohort id: ${foundCohort._id} not found`));
        }
      });
  });

module.exports = cohorts;

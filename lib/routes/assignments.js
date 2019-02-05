const { Router } = require('express');
const Assignment = require('../../lib/models/Assignment');
const { HttpError } = require('../../lib/middleware/error');
const { ensureAuth } = require('../middleware/ensureTeacher');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { cohortId, name, difficulty, travis } = req.body;
    Assignment
      .create({
        cohortId,
        name, 
        difficulty,
        travis
      })
      .then(assignment => res.send(assignment))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Assignment
      .find()
      .select('-__v -_id')
      .populate('Cohort', '-__v -_id')
      .then(assignments => res.send(assignments))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Assignment
      .findById(req.params.id)
      .select('-__v -_id')
      .populate('Cohort', '-__v -_id')
      .then(assign => {
        if(!assign) {
          return next(new HttpError(401, `no assignment found with id: ${req.params.id}`));
        }
        return res.send(assign);
      })
      .catch(next);
  });

const { Router } = require('express');
const Assignment = require('../../lib/models/Assignment');
const { HttpError } = require('../../lib/middleware/error');
const { ensureAuth } = require('../middleware/ensureTeacher');
const Cohort = require('../models/Cohort');

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
      .then(assignment => {
        // console.log(assignment);
        Cohort.findById(assignment.cohortId)
          .then(cohort => {
            console.log('old', cohort);
            let newSleep, newKnowledge, newStress;
            if(assignment.difficulty === 'easy') {
              newSleep = cohort.sleep * .2;
              newKnowledge = cohort.knowledge * .2;
              newStress = cohort.stress * .2;
            }
            else if(assignment.difficulty === 'medium') {
              newSleep = cohort.sleep * .2;
              newKnowledge = cohort.knowledge * .2;
              newStress = cohort.stress * .2;
            }
            else {
              newSleep = cohort.sleep * .2;
              newKnowledge = cohort.knowledge * .2;
              newStress = cohort.stress * .2;
            }
            return Promise.all([
              Promise.resolve(assignment),
              Cohort.findByIdAndUpdate(assignment.cohortId, { 
                sleep: newSleep, 
                knowledge: newKnowledge, 
                stress: newStress
              }, { new: true })
            ]).then(([assignment, updated]) => {
              res.send(assignment);
              console.log('new', updated);
              console.log('assType', assignment);
            });
          });

      })
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

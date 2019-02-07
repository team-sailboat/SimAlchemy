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
        Cohort.findById(assignment.cohortId)
          .then(cohort => {
            let newSleep, newKnowledge, newStress;
            if(assignment.name === 'lab') {
              if(assignment.difficulty === 'easy') {
                newSleep = Math.floor(cohort.sleep * .9);
                newKnowledge = Math.floor(cohort.knowledge * 1);
                newStress = Math.floor(cohort.stress * 1.1);
              }
              else if(assignment.difficulty === 'medium') {
                newSleep = Math.floor(cohort.sleep * .8);
                newKnowledge = Math.floor(cohort.knowledge * 1.5);
                newStress = Math.floor(cohort.stress * 1.4);
              }
              else {
                newSleep = Math.floor(cohort.sleep * .7);
                newKnowledge = Math.floor(cohort.knowledge * 1.6);
                newStress = Math.floor(cohort.stress * 1.6);
              }
            }
            else if(assignment.name === 'reading') {
              if(assignment.difficulty === 'easy') {
                newSleep = Math.floor(cohort.sleep * .8);
                newKnowledge = Math.floor(cohort.knowledge * 1.1);
                newStress = Math.floor(cohort.stress * 1.1);
              }
              else if(assignment.difficulty === 'medium') {
                newSleep = Math.floor(cohort.sleep * .7);
                newKnowledge = Math.floor(cohort.knowledge * 1.5);
                newStress = Math.floor(cohort.stress * 1.4);
              }
              else {
                newSleep = Math.floor(cohort.sleep * .6);
                newKnowledge = Math.floor(cohort.knowledge * 1.7);
                newStress = Math.floor(cohort.stress * 1.6);
              }
            }
            else if(assignment.name === 'lecture') {
              if(assignment.difficulty === 'easy') {
                newSleep = Math.floor(cohort.sleep * 1);
                newKnowledge = Math.floor(cohort.knowledge * 1.2);
                newStress = Math.floor(cohort.stress * 1.1);
              }
              else if(assignment.difficulty === 'medium') {
                newSleep = Math.floor(cohort.sleep * 1);
                newKnowledge = Math.floor(cohort.knowledge * 1.7);
                newStress = Math.floor(cohort.stress * 1.4);
              }
              else {
                newSleep = Math.floor(cohort.sleep * 1);
                newKnowledge = Math.floor(cohort.knowledge * 1.8);
                newStress = Math.floor(cohort.stress * 1.6);
              }
            }
       
            return Promise.all([
              Promise.resolve(assignment),
              Cohort.findByIdAndUpdate(assignment.cohortId, { 
                sleep: newSleep, 
                knowledge: newKnowledge, 
                stress: newStress
              }, { new: true })
            ]).then(([assignment, updated]) => {
              if(updated) {
                res.send(assignment);
              }
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

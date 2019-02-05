const { Router } = require('express');
const Assignment = require('../../lib/models/Assignment');
// const { HttpError } = require('../../lib/middleware/error');
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
  });

const { Router } = require('express');
const Teacher = require('../../lib/models/Teacher');
// const { HttpError } = require('../../lib/middleware/error');
// const { ensureAuth } = require('../../lib/middleware/ensureTeacher');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    Teacher.create({ username, password })
      .then(teacher => res.send({ 
        teacher, 
        token: teacher.authToken() 
      }))
      .catch(next);
  });

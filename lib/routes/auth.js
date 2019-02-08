const { Router } = require('express');
const { ensureAuth } = require('../../lib/middleware/ensureTeacher');
const { HttpError } = require('../../lib/middleware/error');
const Teacher = require('../../lib/models/Teacher');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    Teacher.create({ username, password })
      .then(teacher => res.send({ 
        teacher, 
        token: teacher.authToken() 
      }))
      .catch(next);
  })
  .post('/signin', (req, res, next) => {
    const { username, password } = req.body;
    Teacher.findOne({ username })
      .then(foundTeacher => {
        if(!foundTeacher) {
          return next(new HttpError(401, 'Bad username or password'));
        }
        return Promise.all([
          Promise.resolve(foundTeacher),
          foundTeacher.compare(password)
        ]);
      })
      .then(([foundTeacher, passwordCorrect]) => {
        if(passwordCorrect) {
          res.send({
            foundTeacher, token: foundTeacher.authToken()
          });
        }
        else {
          next(new HttpError(401, 'Bad username or password'));
        }
      })
      .catch(next);
  })
  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.teacher);
  });

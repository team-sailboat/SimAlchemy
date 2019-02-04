const { HttpError } = require('./error');
const Teacher = require('../models/Teacher');

const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  const token = authHeader
    .replace(/Bearer\s/i, '');
  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  return Teacher.findByToken(req.token)
    .then(teacher => {
      if(teacher) {
        req.teacher = teacher;
        next();
      } else {
        return next(new HttpError(400, 'Not a valid token'));
      }
    })
    .catch(next);
};

module.exports = {
  ensureAuth,
  bearerToken
};

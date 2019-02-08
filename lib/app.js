const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const connection = require('./middleware/connection');
const { bearerToken } = require('./middleware/ensureTeacher');
const auth = require('./routes/auth');
const cohorts = require('./routes/cohorts');
const assignments = require('./routes/assignments');
const teachers = require('./routes/teachers');

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));

app.use(express.json());
app.use(bearerToken);
app.use('/auth', connection, auth);
app.use('/cohorts', connection, cohorts);
app.use('/assignments', connection, assignments);
app.use('/teachers', connection, teachers);

app.use(express.static(__dirname + '/Public'));
app.use('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
  next();
});

app.use(notFound);
app.use(handler);

module.exports = app;

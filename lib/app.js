const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const connection = require('./middleware/connection');
const { bearerToken } = require('./middleware/ensureTeacher');
const auth = require('./routes/auth');
const cohorts = require('./routes/cohorts');

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));

app.use(express.json());
app.use(bearerToken);
app.use('/auth', connection, auth);
app.use('/cohorts', connection, cohorts);

app.get('/', (req, res) => {
  res.status(200).send(
    'Welcome to Team Sailboat\'s SimAlchemy App'
  );
});

app.use(notFound);
app.use(handler);

module.exports = app;

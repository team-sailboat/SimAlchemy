/* eslint-disable no-console */
require('dotenv').config();
require('./lib/utils/connect')();
const seedData = require('./test/seedData');
const mongoose = require('mongoose');

seedData({})
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());

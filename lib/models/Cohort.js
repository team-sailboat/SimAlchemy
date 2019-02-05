const mongoose = require('mongoose');

const cohortSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  stress: {
    type: Number,
    default: 0
  },
  sleep: {
    type: Number,
    default: 100
  },
  knowledge: {
    type: Number,
    default: 25
  }
});

module.exports = mongoose.model('Cohort', cohortSchema);

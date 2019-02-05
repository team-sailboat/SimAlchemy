const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
  cohortId: {
    ref: 'Cohort',
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Assignment', assignmentSchema);

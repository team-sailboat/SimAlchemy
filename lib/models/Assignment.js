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
  },
  travis: {
    type: Number,
    required: true
  }
});

const matchCohort = (id) => (
  { $match: { 'cohortId' : id } }
);

const groupAssigns = () => (
  { $group: { _id: null, min: { $min: '$travis' }, max: { $max: '$travis' }, avg: { $avg: '$travis' } } }    
);

assignmentSchema.statics.getTravis = function(id) {
  return this.aggregate([matchCohort(id), groupAssigns()]);
};

module.exports = mongoose.model('Assignment', assignmentSchema);

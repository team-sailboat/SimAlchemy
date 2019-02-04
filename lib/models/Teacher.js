const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
    unique: [true, 'Username taken']
  },
  passwordHash: String
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      delete ret.passwordHash;
    } 
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);

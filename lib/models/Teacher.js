const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');

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

teacherSchema
  .virtual('password')
  .set(function(password) {
    this._tempPassword = password;
  });

teacherSchema
  .pre('save', function(next) {
    hash(this._tempPassword)
      .then(hashedPassword => {
        this.passwordHash = hashedPassword;
        next();
      });
  });

teacherSchema
  .methods.compare = function(password) {
    return compare(password, this.passwordHash);
  };

module.exports = mongoose.model('Teacher', teacherSchema);

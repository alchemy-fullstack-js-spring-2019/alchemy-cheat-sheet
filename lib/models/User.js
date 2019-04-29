const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true  
  },
  passwordHash: String,
  role: {
    type: String,
    enum: ['admin', 'contributor'],
    required: true
  }
}, { 
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash,
      delete ret.__v;
    }
  } 
});

module.exports = mongoose.model('User', userSchema);

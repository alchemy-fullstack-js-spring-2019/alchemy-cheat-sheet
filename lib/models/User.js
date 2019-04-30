const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

userSchema.virtual('password').set(function(password){
  this._tempPassword = password;
});

userSchema.pre('save', async function(){
  this.passwordHash = await bcrypt.hash(this._tempPassword, 10);
});

userSchema.statics.signin = async function(username, password) {
  const user = await this
    .findOne({ username })
    .select({ passwordHash: true, username: true, role: true });
  if(!user) return null;
  const correctCredentials = await bcrypt.compare(password, user.passwordHash);
  if(!correctCredentials) return null;
  const token = jwt.sign({ payload: user.toJSON() }, process.env.AUTH_SECRET, { expiresIn: '25h' });
  return { user, token };
};

userSchema.statics.signup = async function(username, password, role) {
  const user = await this.create({ username, password, role });
  const token = jwt.sign({ payload: user.toJSON() }, process.env.AUTH_SECRET, { expiresIn: '25h' });
  return { user, token };
}; 

module.exports = mongoose.model('User', userSchema);

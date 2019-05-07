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
    //enum: ['admin', 'contributor'],
    default: 'contributor'
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
    .select({ passwordHash: true, username: true });
  if(!user) return null;
  const correctCredentials = await bcrypt.compare(password, user.passwordHash);
  if(!correctCredentials) return null;
  const token = jwt.sign({ payload: user.toJSON() }, process.env.AUTH_SECRET, { expiresIn: '25h' });
  return { user, token };
};

userSchema.statics.signup = async function(username, password) {
  const user = await this.create({ username, password });
  const token = jwt.sign({ payload: user.toJSON() }, process.env.AUTH_SECRET, { expiresIn: '25h' });
  return { user, token };
};

userSchema.statics.findByToken = async function(token){
  return await jwt.verify(token, process.env.AUTH_SECRET).payload;
};

module.exports = mongoose.model('User', userSchema);

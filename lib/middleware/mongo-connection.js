const mongoose = require('mongoose');
const state = require('mongoose/lib/connectionstate');

module.exports = (req, res, next) => {
  const { readyState } = mongoose.connection;
  if(readyState === state.connected || readyState === state.connecting) {
    next();
  } else {
    const error = new Error('unable connect to mongoose database');
    error.state = 500;
    next(error);
  }
};

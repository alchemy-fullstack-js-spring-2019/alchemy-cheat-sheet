const { Router } = require('express');
const User = require('../models/User.js');

module.exports = Router()
  .post('/signup', async(req, res, next) => {
    const {
      username,
      password,
      role
    } = req.body;

    try {
      const newUser = await User.signup(username, password, role);
      if(!newUser) {
        const error = new Error('Failed to create the user');
        error.status = 500;
        next(error);
      }
      const { token } = newUser;
      res.cookie('session', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.send(newUser);
    } catch(error) {
      next(error);
    }
  })

  .post('/signin', async(req, res, next) => {
    const {
      username,
      password
    } = req.body;

    try {
      const signedInUser = await User.signin(username, password);
      if(!signedInUser) {
        const error = new Error('Invalid Authentication');
        error.status = 401;
        next(error);
      }
      const { user, token } = signedInUser;
      res.cookie('session', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.send(user);
    } catch(error) {
      next(error);
    }
  });

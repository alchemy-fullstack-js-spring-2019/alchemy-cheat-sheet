const { Router } = require('express');
const Topic = require('../models/Topic');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      description
    } = req.body;

    Topic
      .create({ title, description })
      .then(topic => res.send(topic))
      .catch(next);
  });


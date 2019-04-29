const { Router } = require('express');
const Topic = require('../models/Topic');

module.exports = Router()
  .post('/', async(req, res, next) => {
    const {
      title,
      description
    } = req.body;
    try {
      const topic = await Topic.create({ title, description });
      res.send(topic);
    } catch(error) {
      next(error);
    }
  })

  .get('/', async(req, res, next) => {
    try {
      const topics = await Topic.find();
      res.send(topics);
    } catch(error) {
      next(error);
    }
  });


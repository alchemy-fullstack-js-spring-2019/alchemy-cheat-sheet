const { Router } = require('express');
const Note = require('../models/Note');

module.exports = Router()
  .post('/', async(req, res, next) => {
    const {
      user,
      topic,
      title,
      content
    } = req.body;
    try {
      const note = await Note.create({ user, topic, title, content });
      res.send(note);
    } catch(error) {
      next(error);
    }
  });


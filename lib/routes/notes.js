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
  })

  .get('/', async(req, res, next) => {
    try {
      const note = await Note
        .find()
        .select({
          __v: 0
        })
        .lean();
      res.send(note);
    } catch(error) {
      next(error);
    }
  })

  .get('/:id', async(req, res, next) => {
    try {
      const note = await Note
        .findById(req.params.id)
        .populate(
          'topic', {
            title: true,
            description: true
          }
        )
        .select({
          __v: 0   
        })
        .lean();
      res.send(note);
    } catch(error) {
      next(error);
    }
  });


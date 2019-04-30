const { Router } = require('express');
const Note = require('../models/Note');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, async(req, res, next) => {
    const {
      topic,
      title,
      content
    } = req.body;
    
    try {
      const note = await Note.create({ user: req.user._id, topic, title, content });
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
  })

  .patch('/:id', ensureAuth, async(req, res, next) => {
    const { title, content } = req.body;
    try {
      const updatedNote = await Note
        .findByIdAndUpdate(req.params.id, { title, content }, { new: true })
        .populate(
          'topic', {
            title: true,
            description: true
          }
        )
        .select({
          __v: false
        })
        .lean();
      res.send(updatedNote);
    } catch(error) {
      next(error);
    }
  })

  .delete('/:id', ensureAuth, async(req, res, next) => {
    try {
      const deletedNote = await Note
        .findByIdAndDelete(req.params.id)
        .select({
          _id: true
        })
        .lean();
      res.send(deletedNote);
    } catch(error) {
      next(error);
    }
  });

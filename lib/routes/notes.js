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
    const {
      title,
      content
    } = req.body;

    try {
      // use findOneAndUpdate to simplify logic
      const updatedNote = await Note
        .findOneAndUpdate({
          _id: req.params._id,
          user: req.user._id
        },
        { title, content },
        { new: true })
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
      if(!updatedNote) {
        const error = new Error('Update failed. You are not the creator of this note.');
        error.status = 401;
        return next(error);
      }
      res.send(updatedNote);
    }
    catch(error) {
      next(error);
    }
  })

  .delete('/:id', ensureAuth, async(req, res, next) => {
    try {
      // use findOneAndDelete to simplify logic
      const deletedNote = await Note
        .findOneAndDelete({
          _id: req.params._id,
          user: req.user._id
        })
        .select({
          _id: true
        })
        .lean();
      if(!deletedNote) {
        const error = new Error('Delete failed. You are not the creator of this note.');
        error.status = 401;
        return next(error);
      }
      res.send(deletedNote);
    } catch(error) {
      next(error);
    }
  });

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
      const noteToUpdate = await Note 
        .findById(req.params.id);
      if(noteToUpdate.user.toString() === req.user._id.toString()) {        
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
      } 
      const error = new Error('You are not the creator of this note.');
      error.status = 401;
      next(error);
    }
    catch(error) {
      next(error);
    }
  })

  .delete('/:id', ensureAuth, async(req, res, next) => {
    try {
      const noteToBeDeleted = await Note
        .findById(req.params.id);
      if(noteToBeDeleted.user.toString() === req.user._id.toString()) {
        const deletedNote = await Note
          .findByIdAndDelete(req.params.id)
          .select({
            _id: true
          })
          .lean();
        res.send(deletedNote);
      }
      const error = new Error('You are not the creator of this note.');
      error.status = 401;
      next(error);
    } catch(error) {
      next(error);
    }
  });

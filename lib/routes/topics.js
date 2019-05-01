const { Router } = require('express');
const Topic = require('../models/Topic');
const Note = require('../models/Note');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, async(req, res, next) => {
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
    console.log('find me');
    try {
      const topics = await Topic.find();
      res.send(topics);
    } catch(error) {
      next(error);
    }
  })
  
  .get('/:id', async(req, res, next) => {
    try {
      const topic = await Topic
        .findById(req.params.id)
        .select({
          __v: false
        })
        .lean();
      res.send(topic);
    } catch(error) {
      next(error);
    }
  })

  .patch('/:id', ensureAuth, async(req, res, next) => {
    const { description } = req.body;
    try {
      const updatedTopic = await Topic
        .findByIdAndUpdate(req.params.id, { description }, { new: true })
        .select({
          __v: false
        })
        .lean();
      res.send(updatedTopic);
    } catch(error) {
      next(error);
    }
  })

  .delete('/:id', ensureAuth, async(req, res, next) => {
    try {
      const notes = await Note
        .find({ topic: req.params.id });
      if(!notes) {
        const deletedTopic = await Topic
          .findByIdAndDelete(req.params.id)
          .select({
            _id: true
          })
          .lean();
        res.send(deletedTopic);
      } 
      const error = new Error('Topic has notes, cannot delete');
      error.status = 401;
      res.send({});
      next(error);
    } catch(error) {
      next(error);
    }
  });

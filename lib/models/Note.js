const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  topic: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Topic'
  }  
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);

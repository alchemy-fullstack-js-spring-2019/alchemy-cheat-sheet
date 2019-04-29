const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 125
  }
});

module.exports = mongoose.model('Topic', topicSchema);

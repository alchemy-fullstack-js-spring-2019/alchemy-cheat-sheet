require('dotenv').config();
const { del } = require('../commons/request');

const noteDeleteHandler = async(noteId) => {
  try {
    await del(`/notes/${noteId}`);
  } catch(error) {
    console.log(error);
  }

  await require('./contributor')();
};

module.exports = noteDeleteHandler;


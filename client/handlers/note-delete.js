require('dotenv').config();
const chalk = require('chalk');
const { del } = require('../commons/request');

const noteDeleteHandler = async(noteId) => {
  try {
    await del(`/notes/${noteId}`);
  } catch(error) {
    console.log(chalk.bgRed(error.response.body.error));
  }

  await require('./contributor')();
};

module.exports = noteDeleteHandler;

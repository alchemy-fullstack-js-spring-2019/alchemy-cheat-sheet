require('dotenv').config();
const inquirer = require('inquirer');
const { patch } = require('../commons/request');

const notePatchHandler = async(noteId) => {
  const noteTitle = {
    type: 'input',
    name: 'Title'
  };

  const content = {
    type: 'input',
    name: 'Content'
  };
  const updatedNote = await inquirer.prompt([
    noteTitle,
    content
  ]);
  try
  {
    await patch(`/notes/${noteId}`, { title: updatedNote.Title, content: updatedNote.Content });
  } catch(error){
    console.log(error);
  }

  return require('./contributor')();
};

module.exports = notePatchHandler;



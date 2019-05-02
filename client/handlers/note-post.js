require('dotenv').config();
const inquirer = require('inquirer');
const { post } = require('../commons/request');

const notePostHandler = async(topicId) => {
  const noteTitle = {
    type: 'input',
    name: 'Title'
  };

  const content = {
    type: 'input',
    name: 'Content'
  };

  const newNote = await inquirer.prompt([
    noteTitle,
    content
  ]);

  try
  {
    await post('/notes', { topic:topicId, title:newNote.Title, content:newNote.Content });
  } catch(error){
    console.log(error);
  }

  return require('./contributor')();
};

module.exports = notePostHandler;

require('dotenv').config();
const inquirer = require('inquirer');
const { post } = require('../commons/request');

const topicPostHandler = async() => {
  const topicName = {
    type: 'input',
    name: 'title'
  };

  const description = {
    type:'input',
    name: 'description'
  };

  const title = await inquirer.prompt([
    topicName,
    description
  ]);

  try {
    await post('/topics', { title:title.title, description:title.description });
  } catch(error){
    console.log(error);
  }

  return require('./contributor')();
};

module.exports = topicPostHandler;

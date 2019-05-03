const inquirer = require('inquirer');
const { get } = require('../commons/request');
const chalk = require('chalk');
const figlet = require('figlet');

const goodbyeMessage = () => {
  console.log(
    chalk.cyan(
      figlet.textSync('Thanks for using Alchemy Cheat Sheets!', {
        font: 'mini',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};

const seeYouLaterMessage = () => {
  console.log(
    chalk.magenta(
      figlet.textSync('See you later!', {
        font: 'stacey',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};

const viewerHandler = async() =>  {
  const topics = await get('/topics');
  const topicsList = topics.body.map(topic => {
    return { name: topic.title, value: topic._id };
  });
  const topicsListWithExit = [{ name: chalk.white.bgBlue.bold('EXIT TO CONSOLE'), value: 'exit' }, ...topicsList];

  const chooseTopic = {
    type: 'list',
    name: 'Topic',
    choices: topicsListWithExit
  };

  const chosenTopic = await inquirer.prompt([
    chooseTopic
  ]);

  if(chosenTopic.Topic === 'exit') {
    return seeYouLaterMessage();
  }

  const notes = await get(`/topics/notes/${chosenTopic.Topic}`);
  const notesList = notes.body.map(note => {
    return { name: note.title, value: note._id };
  });
  const notesListWithExit = [{ name: chalk.white.bgGreen.bold('BACK TO TOPICS'), value: 'topics' }, ...notesList];

  const chooseNote = {
    type: 'list',
    name: 'Note',
    choices: notesListWithExit,
  };

  const chosenNote = await inquirer.prompt([
    chooseNote
  ]);

  if(chosenNote.Note === 'topics') {
    return require('./viewer')();
  }

  const note = await get(`/notes/${chosenNote.Note}`);
  console.log(chalk.white.bold('Content:', note.body.content));
  console.log(chalk.gray.bold('Last Updated:', note.body.updatedAt));

  const exitOptions = [
    { name: 'Exit to console', value: 'exit' },
    { name: 'Back to topics', value: 'rerun' }
  ];

  const chooseExit = {
    type: 'list',
    name: 'Choice',
    choices: exitOptions,
  };

  const chosenExit = await inquirer.prompt([
    chooseExit
  ]);
  if(chosenExit.Choice === 'exit') {
    goodbyeMessage();
  } else {
    return viewerHandler();
  }
};

module.exports = viewerHandler;

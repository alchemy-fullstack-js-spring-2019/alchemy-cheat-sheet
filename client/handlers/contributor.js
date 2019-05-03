const inquirer = require('inquirer');
const { get } = require('../commons/request');
const topicPostHandler = require('./topic-post');
const notePostHandler = require('../handlers/note-post');
const notePatchHandler = require('../handlers/note-patch');
const noteDeleteHandler = require('../handlers/note-delete');
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

const contributorHandler = async() =>  {
  const topics = await get('/topics');
  const topicsList = topics.body.map(topic => {
    return { name: topic.title, value: topic._id };
  });
  const topicsListWithCreate = [{ name: chalk.white.bgBlue.bold('CREATE TOPIC'), value: '121299' }, ...topicsList];

  const chooseTopic = {
    type: 'list',
    name: 'Topic',
    choices: topicsListWithCreate
  };

  const chosenTopic = await inquirer.prompt([
    chooseTopic
  ]);
  
  if(chosenTopic.Topic != '121299') {
    const notes = await get(`/topics/notes/${chosenTopic.Topic}`);
    const notesList = notes.body.map(note => {
      return { name: note.title, value: note._id };
    });
    const notesListWithCreate = [{ name: chalk.white.bgBlue.bold('CREATE NOTE'), value: chosenTopic.Topic }, { name: chalk.white.bgGreen.bold('BACK TO TOPICS'), value: 'topics' }, ...notesList];


    const chooseNote = {
      type: 'list',
      name: 'Note',
      choices: notesListWithCreate,
    };
  
    const chosenNote = await inquirer.prompt([
      chooseNote
    ]);

    if(chosenNote.Note === chosenTopic.Topic) {
      return notePostHandler(chosenTopic.Topic);
    }

    if(chosenNote.Note === 'topics') {
      return require('./contributor')();
    }

    const note = await get(`/notes/${chosenNote.Note}`);
    console.log(chalk.white.bold('Content:', note.body.content));
    console.log(chalk.gray.bold('Last Updated:', note.body.updatedAt));
  
    const exitOptions = [
      { name: 'Exit to Console', value: 'exit' },
      { name: 'Back to Topics', value: 'rerun' },
      { name: 'Update Note', value: chosenNote.Note },
      { name: 'Delete Note', value: `${chosenNote.Note}delete` }
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
    } else if(chosenExit.Choice === chosenNote.Note) {
      await notePatchHandler(chosenNote.Note);
    } else if(chosenExit.Choice === `${chosenNote.Note}delete`) {
      await noteDeleteHandler(chosenNote.Note);
    } else {
      return contributorHandler();
    }
  } else {
    return topicPostHandler();
  }
};

module.exports = contributorHandler;

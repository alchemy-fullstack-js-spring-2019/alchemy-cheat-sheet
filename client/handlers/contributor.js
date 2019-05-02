const inquirer = require('inquirer');
const { get } = require('../commons/request');
const topicPostHandler = require('./topic-post');
const notePostHandler = require('../handlers/note-post');
const notePatchHandler = require('../handlers/note-patch');

const contributorHandler = async() =>  {
  const topics = await get('/topics');
  const topicsList = topics.body.map(topic => {
    return { name: topic.title, value: topic._id };
  });
  const topicsListWithCreate = [{ name: 'CREATE TOPIC', value: '121299' }, ...topicsList];

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
    const notesListWithCreate = [{ name: 'CREATE NOTE', value: chosenTopic.Topic }, ...notesList];

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

    const note = await get(`/notes/${chosenNote.Note}`);
    console.log('Content:', note.body.content);
    console.log('Last Updated:', note.body.updatedAt);
  
    const exitOptions = [
      { name: 'Exit to console', value: 'exit' },
      { name: 'Back to topics', value: 'rerun' },
      { name: 'Update Note', value: chosenNote.Note }
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
      console.log('Thanks for using Alchemy Cheat Sheets!');
    } else if(chosenExit.Choice === chosenNote.Note) {
      await notePatchHandler(chosenNote.Note);
    }
    else {
      return contributorHandler();
    }
  } else {
    return topicPostHandler();
  }
};

module.exports = contributorHandler;

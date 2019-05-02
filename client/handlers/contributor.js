const inquirer = require('inquirer');
const { get } = require('../commons/request');
const topicPostHandler = require('./topic-post');
const notePostHandler = require('../handlers/note-post');

const contributorHandler = async() =>  {
  const topics = await get('/topics');
  const topicsList = topics.body.map(topic => {
    return { name: topic.title, value: topic._id };
  });
  const topicsListWithCreate = [{ name:'CREATE TOPIC', value:'121299' }, ...topicsList];

  const chooseTopic = {
    type: 'list',
    name: 'Topic',
    choices: topicsListWithCreate
  };

  const chosenTopic = await inquirer.prompt([
    chooseTopic
  ]);
  
  if(chosenTopic.Topic != '121299'){
    const notes = await get(`/topics/notes/${chosenTopic.Topic}`);
    const notesList = notes.body.map(note => {
      return { name: note.title, value: note._id };
    });
    const notesListWithCreate = [{ name:'CREATE-NOTE', value:chosenTopic.Topic }, ...notesList];
    //we went into a topic that allready exists
    ///we need the id of the topic that fetch was done with.
    //this id = chosenTopic.topic.
    //in here we want a prompt that eiterh lets you 1)click on a note, exit
    //to index, OR create a note
    //if you hit create a note, the value of create note needs to be chosen 
    //topic.topic
    //const notesListWithCreate = [{ name:'CREATE NOTE', value:chosenTopic.topic }, ...notesList];

    const chooseNote = {
      type: 'list',
      name: 'Note',
      choices: notesListWithCreate,
    };
  
    const chosenNote = await inquirer.prompt([
      chooseNote
    ]);

    if(chosenNote.Note === chosenTopic.Topic){
      return notePostHandler(chosenTopic.Topic);
    }

    const note = await get(`/notes/${chosenNote.Note}`);
    console.log('Content:', note.body.content);
    console.log('Last Updated:', note.body.updatedAt);
  
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
      console.log('Thanks for using Alchemy Cheat Sheets!');
    } else {
      return contributorHandler();
    }
  } else {
    return topicPostHandler();
  }
};

module.exports = contributorHandler;

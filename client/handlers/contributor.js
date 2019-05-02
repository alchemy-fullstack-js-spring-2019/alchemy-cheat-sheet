
const inquirer = require('inquirer');
const { get } = require('../commons/request');

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
  const notes = await get(`/topics/notes/${chosenTopic.Topic}`);
  const notesList = notes.body.map(note => {
    return { name: note.title, value: note._id };
  });

  
  if(chosenTopic.Topic != '121299'){
    const chooseNote = {
      type: 'list',
      name: 'Note',
      choices: notesList,
    };
  
    const chosenNote = await inquirer.prompt([
      chooseNote
    ]);
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
    console.log('we need to call post handler');
  }
};

module.exports = contributorHandler;

const inquirer = require('inquirer');
const { get } = require('../commons/request');

module.exports = async() =>  {
  const topics = await get('/topics');
  const topicsList = topics.body.map(topic => {
    return { name: topic.title, value: topic._id };
  });

  const chooseTopic = {
    type: 'list',
    name: 'Topic',
    choices: topicsList
  };

  inquirer.prompt([
    chooseTopic
  ])
    .then(async(chosenTopic) => {
      const notes = await get(`/topics/notes/${chosenTopic.Topic}`);
      const notesList = notes.body.map(note => {
        return { name: note.title, value: note._id };
      });

      const chooseNote = {
        type: 'list',
        name: 'Note',
        choices: notesList
      };

      inquirer.prompt([
        chooseNote
      ])
        .then(async(chosenNote) => {
          const note = await get(`/notes/${chosenNote.Note}`);
          console.log('Content:', note.body.content);
          console.log('Last Updated:', note.body.updatedAt);
        });
    });
};

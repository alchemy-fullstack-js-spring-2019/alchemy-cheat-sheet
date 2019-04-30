const chance = require('chance').Chance();
const Topic = require('../lib/models/Topic');
const User = require('../lib/models/User');
const Note = require('../lib/models/Note');

module.exports = async({ userCount = 5, topicCount = 10, noteCount = 30 } = {}) => {
  const users = [...Array(userCount)].map(() => ({
    username: chance.name(),
    password: chance.word({ length: 1 }),
    role: 'contributor'
  }));
  const createdUsers = await User.create(users);
  
  const topics = [...Array(topicCount)].map(() => ({
    title: chance.name(),
    description: chance.word({ length: 5 })
  }));
  
  const createdTopics = await Topic.create(topics);

  const notes = [...Array(noteCount)].map(() => ({
    title: chance.name(),
    content: chance.word({ length: 10 }),
    user: chance.pickone(createdUsers)._id,
    topic: chance.pickone(createdTopics)._id
  }));
  
  await Note.create(notes);
};

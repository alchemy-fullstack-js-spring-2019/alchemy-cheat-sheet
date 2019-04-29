const chance = require('chance').Chance();
const Topic = require('../lib/models/Topic');


module.exports = ({ topicCount = 10 } = {}) => {
  const topics = [...Array(topicCount)].map(() => ({
    title: chance.name(),
    description: chance.word({ length: 5 })
  }));

  return Topic.create(topics); 
};

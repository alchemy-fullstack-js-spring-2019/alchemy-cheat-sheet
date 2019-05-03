const mongoose = require('mongoose');
const Topic = require('../../lib/models/Topic');

describe('Topic model', () => {
  it('has a title and description', () => {
    const topic = new Topic({
      title: 'Express',
      description: 'All notes about Express'
    });

    expect(topic.toJSON()).toEqual({
      title: 'Express',
      description: 'All notes about Express',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  
  it('requires a title', () => {
    const topic = new Topic({});

    const errors = topic.validateSync().errors;
    expect(errors.title.message).toEqual('Path `title` is required.');
  });
});

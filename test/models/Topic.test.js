const mongoose = require('mongoose');
const Topic = require('../../lib/models/Topic');

describe('Topic model', () => {
  it('has a title and notes', () => {
    const topic = new Topic({
      title: 'Express',
      notes: [new mongoose.Types.ObjectId()]
    });

    expect(topic.toJSON()).toEqual({
      title: 'Express',
      notes: expect.any(Array),
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});

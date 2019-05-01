const mongoose = require('mongoose');
const Note = require('../../lib/models/Note');

describe('Note model', () => {
  it('has a name, content, ref to user, and a topic', () => {
    const note = new Note({
      title: 'CRUD',
      content: 'crud method stuff',
      user: new mongoose.Types.ObjectId(),
      topic: new mongoose.Types.ObjectId()
    });
    
    expect(note.toJSON()).toEqual({
      title: 'CRUD',
      content: 'crud method stuff',
      user: expect.any(mongoose.Types.ObjectId),
      topic: expect.any(mongoose.Types.ObjectId),
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  
  it('requires title, content, user, topics', () => {
    const note = new Note({});

    const errors = note.validateSync().errors;
    expect(errors.title.message).toEqual('Path `title` is required.');
    expect(errors.content.message).toEqual('Path `content` is required.');
    expect(errors.user.message).toEqual('Path `user` is required.');
    expect(errors.topic.message).toEqual('Path `topic` is required.');
  });
});

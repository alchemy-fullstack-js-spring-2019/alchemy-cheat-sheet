const request = require('supertest');
const app = require('../../lib/app');
const { getUser, getTopic } = require('../data-helpers');


describe('notes routes', ()=>{
  it('can create a note', async() => {
    const user = await getUser();
    const topic = await getTopic();
    const userId = user._id;
    const topicId = topic._id;
    const note = await request(app)
      .post('/api/v1/notes')
      .send({
        title:'my first note',
        content: 'this has content',
        user: userId,
        topic: topicId
      });
    expect(note.body).toEqual({
      title:'my first note',
      _id: expect.any(String),
      __v: 0,
      content: 'this has content',
      user: expect.any(String),
      topic: expect.any(String),
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });

  });
});

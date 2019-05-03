const { getTopic, getNote, getAgent } = require('../data-helpers');

describe('notes routes', ()=>{
  it('can create a note', async() => {
    const topic = await getTopic();
    const topicId = topic._id;
    const note = await getAgent()
      .post('/api/v1/notes')
      .send({
        title:'my first note',
        content: 'this has content',
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

  it('can get all notes', async() => {
    const notes = await getAgent()
      .get('/api/v1/notes');
    
    expect(notes.body).toHaveLength(30);
  });

  it('can get a note by ID', async() => {
    const testNote = await getNote();
    const id = testNote._id;
    const note = await getAgent()
      .get(`/api/v1/notes/${id}`);

    expect(note.body).toEqual({
      title: expect.any(String),
      content: expect.any(String),
      user: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      _id: expect.any(String),
      topic: {
        _id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String)
      }
    });
  });

  it('can update title and content if owner of note', async() => {
    const testTopic = await getTopic();
    const testNote = await getAgent()
      .post('/api/v1/notes')
      .send({
        title: 'test note',
        content: 'add content',
        topic: testTopic._id
      });
    const id = testNote.body._id;
    const note = await getAgent()
      .patch(`/api/v1/notes/${id}`)
      .send({
        title: 'better title',
        content: 'some better content'
      });
    
    expect(note.body).toEqual({
      title: 'better title',
      content: 'some better content',
      user: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      _id: expect.any(String),
      topic: {
        _id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String)
      }
    });
  });

  it('can delete a note that belongs to the user', async() => {
    const testTopic = await getTopic();
    const testNote = await getAgent()
      .post('/api/v1/notes')
      .send({
        title: 'test note',
        content: 'add content',
        topic: testTopic._id
      });
    const id = testNote.body._id;
    const note = await getAgent()
      .delete(`/api/v1/notes/${id}`);
    expect(note.body).toEqual({
      _id: expect.any(String)
    });
  });
});

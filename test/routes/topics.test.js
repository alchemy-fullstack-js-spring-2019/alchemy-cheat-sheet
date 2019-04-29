require('../data-helpers');
const request = require('supertest');
const app = require('../../lib/app');
const { getTopics, getTopic } = require('../data-helpers');

describe('topics routes', () => {
  it('can create a new topic', async() => {
    const topic = await request(app)
      .post('/api/v1/topics')
      .send({
        title: 'MongoDB',
        description: 'Notes on MongoDB'
      });
    expect(topic.body).toEqual({
      title: 'MongoDB',
      description: 'Notes on MongoDB',
      _id: expect.any(String),
      __v: 0
    });
  });

  it('can find all topics', async() => {
    await getTopics();
    const topics = await request(app)
      .get('/api/v1/topics');
    
    expect(topics.body).toHaveLength(10);
  });

  it('can get a topic by ID', async() => {
    const testTopic = await getTopic();
    const id = testTopic._id;
    const topic = await request(app)
      .get(`/api/v1/topics/${id}`);

    expect(topic.body).toEqual({
      title: expect.any(String),
      description: expect.any(String),
      _id: expect.any(String)
    });
  });
});

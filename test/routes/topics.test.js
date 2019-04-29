require('../data-helpers');
const request = require('supertest');
const app = require('../../lib/app');
const Topic = require('../../lib/models/Topic');

describe('topics routes', () => {
  it('can create a new topic', async() => {
    return request(app)
      .post('/api/v1/topics')
      .send({
        title: 'MongoDB',
        description: 'Notes on MongoDB'
      })
      .then(res => {
        expect(res.body).toEqual({
          title: 'MongoDB',
          description: 'Notes on MongoDB',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});

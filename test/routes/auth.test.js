require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const { getUser } = require('../data-helpers');

describe('auth routes', () => {
  it('can sign up a user', async() => {
    const user = await request(app)
      .post('/api/v1/auth/signup')
      .send({ 
        username: 'testname', 
        password: '123',
        role: 'contributor' 
      });
  
    expect(user.body).toEqual({
      user: {
        username: 'testname',
        role: 'contributor',
        _id: expect.any(String)
      },
      token: expect.any(String)
    });
  });

  it('can sign in a user', async() => {
    const testUser = await getUser();
    const user = await request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: testUser.username,
        password: '123'
      });

    expect(user.body).toEqual({
      username: testUser.username,
      _id: expect.any(String)
    });
  });
});

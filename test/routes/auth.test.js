require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/models/User');

describe('auth routes', () => {
  beforeAll(async() => {
    await connect();
  });

  beforeEach(async() => {
    await mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
  });

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
});

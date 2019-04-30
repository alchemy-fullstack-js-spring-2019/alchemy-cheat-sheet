require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const seedData  = require('./seed-data');
// const request = require('supertest');
// const app = require('../lib/app');
const Topic = require('../lib/models/Topic'); 
const User = require('../lib/models/User'); 
// const agent = request.agent(app);

beforeAll(async() => {
  await connect();
});

beforeEach(async() => {
  await mongoose.connection.dropDatabase();
//   return agent
//     .post('/api/v1/auth/signup')
//     .send({ email:'email', password:'123' });
});

beforeEach(async() => {
  await seedData();
});

afterAll(async() => {
  await mongoose.connection.close();
});

const prepare = model => JSON.parse(JSON.stringify(model));
const createGetters = Model => ({
  [`get${Model.modelName}`]: query => Model.findOne(query).then(prepare),
  [`get${Model.modelName}s`]: query => Model.find(query).then(models => models.map(prepare))
});

module.exports = {
  ...createGetters(Topic),
  ...createGetters(User)
  // getAgent: () => agent
};

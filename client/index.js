require('dotenv').config();
const topics = require('./handlers/home-page');
const test = topics();
console.log(test);

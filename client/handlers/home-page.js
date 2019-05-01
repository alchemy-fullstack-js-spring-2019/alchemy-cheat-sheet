const inquirer = require('inquirer');
const { get } = require('../commons/request');
const request = require('superagent');

//module.exports = async() => { await get('/topics'); };
const test = get('/topics');
console.log(test.body);



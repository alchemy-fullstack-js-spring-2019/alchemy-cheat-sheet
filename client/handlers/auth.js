require('dotenv').config();
const inquirer = require('inquirer');
const chalk = require('chalk');
const contributorHandler = require('./contributor');
const { post } = require('../commons/request');

const authHandler = async() => {
  const signupOrSignin = {
    type: 'list',
    name: 'authType',
    message: chalk.magenta('Sign up or sign in?'),
    choices: [
      { name: 'Sign up', value: '/auth/signup' },
      { name: 'Sign in', value: '/auth/signin' }
    ]
  };
  
  const username = {
    type: 'input',
    name: 'Username'
  };
  
  const password = {
    type: 'password',
    name: 'Password'
  };

  const userAuthParams = await inquirer.prompt([
    signupOrSignin,
    username,
    password
  ]);

  try {
    const user = await post(userAuthParams.authType, { username: userAuthParams.Username, password: userAuthParams.Password });
    if(user){
      return contributorHandler();
    }
  } catch(error){
    console.log(chalk.bgRed(error.response.body.error));
    return require('./auth')();
  }
};

module.exports = authHandler;

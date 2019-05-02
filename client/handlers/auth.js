require('dotenv').config();
const contributorHandler = require('./contributor');
const request = require('superagent');
const inquirer = require('inquirer');

const authHandler = async() => {
  const signupOrSignin = {
    type: 'list',
    name: 'authType',
    message: 'Sign up or sign in?',
    choices: [
      { name: 'signup', value: '/auth/signup' },
      { name: 'signin', value: '/auth/signin' }
    ]
  };
  
  const username = {
    type: 'input',
    name: 'username'
  };
  
  const password = {
    type: 'password',
    name: 'password'
  };

  const userAuthParams = await inquirer.prompt([
    signupOrSignin,
    username,
    password
  ]);

  try {
    const user = await request
      .post(`${process.env.BASE_URL}${userAuthParams.authType}`)
      .send({ username: userAuthParams.username, password:userAuthParams.password });
    if(user){
      return contributorHandler();
    }
  } catch(error){
    console.log(error);
  }
  
};


module.exports = authHandler;

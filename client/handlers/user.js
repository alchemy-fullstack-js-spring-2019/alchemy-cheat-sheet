const inquirer = require('inquirer');
const viewerHandler = require('./viewer');
const authHandler = require('./auth');

console.log('Select a Role: ');

const userHandler = async() => {
  const chooseUserType = {
    type: 'list',
    name: 'User',
    choices: [
      { name: 'Viewer', value: 'viewer' },
      { name: 'Contributor', value: 'contributor' } 
    ]
  };

  const chosenUserType = await inquirer.prompt([
    chooseUserType
  ]);
  if(chosenUserType.User === 'viewer') {
    return viewerHandler();
  } else {
    return authHandler();
  }
};

module.exports = userHandler;

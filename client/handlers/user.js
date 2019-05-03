const inquirer = require('inquirer');
const viewerHandler = require('./viewer');
const authHandler = require('./auth');
const figlet = require('figlet');
const chalk = require('chalk');

const welcomeMessage = () => {
  console.log(
    chalk.hex('#8fc400')(
      figlet.textSync('Welcome to', {
        font: 'ogre',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};

const subtitleMessage = () => {
  console.log(
    chalk.hex('#ff5db1')(
      figlet.textSync('Alchemy Cheat Sheets', {
        font: 'tombstone',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};

welcomeMessage();
subtitleMessage();

const userHandler = async() => {
  const chooseUserType = {
    type: 'list',
    message: chalk.magenta('Please select a role:'),
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

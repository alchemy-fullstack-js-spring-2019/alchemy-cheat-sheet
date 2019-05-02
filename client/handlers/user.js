const inquirer = require('inquirer');
const viewerHandler = require('./viewer');
const authHandler = require('./auth');
const figlet = require('figlet');
const chalk = require('chalk');

const colorFontCreator = () => {
  console.log(
    chalk.hex('#ff5db1')(
      figlet.textSync('Welcome!', {
        font: 'doom',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};

colorFontCreator();

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

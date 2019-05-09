/* eslint-disable no-console */
const inquirer = require('inquirer');
const signin = require('./signin');
const signup = require('./signup');
const figlet = require('figlet');
const menu = require('./menu');
const { getToken, getTeach } = require('../helper/tokens');
const gradient = require('gradient-string');

console.log(gradient.cristal(figlet.textSync('SimAlchemy\r', {
  font: 'slant',
  horizontalLayout: 'default',
  verticalLayout: 'default'
})));
console.log(gradient('yellow', 'green')('\nChoose your own code school adventure for the command line!\n'));

const authUser = async() => {
  const prompt = await inquirer.prompt([
    {
      type: 'list',
      name: 'selection',
      message: 'Are you a returning User?\n',
      choices: [{
        name: 'Yes',
        value: 'signin'
      },
      {
        name: 'No',
        value: 'signup'
      }]
    }
  ]);
  if(prompt.selection === 'signin') {
    return signin();
  }
  else if(prompt.selection === 'signup') {
    return signup();
  }
  return menu(getToken(), getTeach());
   
};

module.exports = authUser;

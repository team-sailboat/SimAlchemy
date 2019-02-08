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

const authUser = () => {
  return inquirer.prompt([
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
  ])
    .then(({ selection }) => {
      if(selection === 'signin') {
        return signin();
      }
      else if(selection === 'signup') {
        return signup();
      }
    })
    .then(() => {
      return menu(getToken(), getTeach());
    })
    .catch(error => {
      if(error.response) {
        console.log(error.response.body.error);
      }
      else {
        console.log(error);
      }
    });
};

module.exports = authUser;

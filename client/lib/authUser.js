/* eslint-disable no-console */
const inquirer = require('inquirer');
const signin = require('./signin');
const signup = require('./signup');
const figlet = require('figlet');
const menu = require('./menu');
const { getToken, getTeach } = require('../helper/tokens');

console.log(figlet.textSync('SimAlchemy\r', {
  // font: 'chunky',
  horizontalLayout: 'default',
  verticalLayout: 'default'
}));

const authUser = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'selection',
      message: 'Are you a returning User?\n\n',
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

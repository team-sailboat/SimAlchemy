/* eslint-disable no-console */
const inquirer = require('inquirer');
const signin = require('./signin');
const signup = require('./signup');
const figlet = require('figlet');

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
      message: 'Are you a returning User?',
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
    .catch(error => {
      // console.log(error.response.body.error);
      console.log(error);
      signin();
    });
};

module.exports = authUser;

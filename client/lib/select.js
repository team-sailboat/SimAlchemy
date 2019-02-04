const inquirer = require('inquirer');
const signin = require('./signin');
const signup = require('./signup');

const select = () => {
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
    .then(console.log); 
};

module.exports = select;

const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('../helper/tokens');

const assignmentPost = id => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'assignment',
      message: 'It\'s time to post your first assignment. Choose an assignment:',
      choices: [{ 
        name: 'lab',
        value: 'lab'
      },
      {
        name: 'reading',
        value: 'reading'
      },
      {
        name: 'lecture',
        value: 'lecture'
      }
      ]
    }
  ])
    .then(assType => {
      console.log('ass', assType);
    });
};
module.exports = assignmentPost;

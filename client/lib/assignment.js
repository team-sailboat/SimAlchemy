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
      return inquirer.prompt([
        {
          type: 'list',
          name: 'difficulty',
          message: 'Choose a difficulty:',
          choices: [{ 
            name: 'easy',
            value: 'easy'
          },
          {
            name: 'medium',
            value: 'medium'
          },
          {
            name: 'hard',
            value: 'hard'
          }
          ]
        }
      ])
        .then(difficulty => {
          console.log('assType, diff', assType, difficulty);
        });
    });
};
module.exports = assignmentPost;
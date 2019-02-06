const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('../helper/tokens');
const updateStats = require('./updateStats');


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
          name: 'type',
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
          let travis;

          if(difficulty.type === 'easy') {
            travis = 100;
          }
          else if(difficulty.type === 'medium') {
            travis = 75;
          }
          else {
            travis = 50;
          }
        
          return request 
            .post(`${config.url}/assignments`)
            .set('Authorization', `Bearer ${getToken()}`)
            .send({
              cohortId: id,
              name: assType.assignment,
              difficulty: difficulty.type,
              travis
            })
            .then(() => {
              return updateStats(id, difficulty);
            });
        });
    });
};
module.exports = assignmentPost;

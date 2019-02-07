const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('../helper/tokens');
const updateStats = require('./updateStats');
const genMsg = require('./genMsg');
const Chance = require('chance');
const chance = new Chance();

const assignmentPost = id => {
  return genMsg(id) 
    .then(msg => {
      return inquirer.prompt([
        {
          type: 'list',
          name: 'assignment',
          message: `${msg}\n\n`,
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
                travis = chance.integer({ min: 75, max: 100 });
              }
              else if(difficulty.type === 'medium') {
                travis = chance.integer({ min: 40, max: 74 });
              }
              else {
                travis = chance.integer({ min: 1, max: 39 });
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
                  return updateStats(id);
                })
                .then(() => {
                  return assignmentPost(id);
                });
            });
        });

    });
};
module.exports = assignmentPost;

const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('../helper/tokens');
const updateStats = require('./updateStats');
const genMsg = require('./genMsg');
const Chance = require('chance');
const chance = new Chance();

const assignmentPost = async(id) => {
  const msg = await genMsg(id); 
  const assType = await inquirer.prompt([
    {
      type: 'list',
      name: 'assignment',
      message: `${msg}`,
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
  ]);
  const difficulty = await inquirer.prompt([
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
  ]);
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
          
  await request 
    .post(`${config.url}/assignments`)
    .set('Authorization', `Bearer ${getToken()}`)
    .send({
      cohortId: id,
      name: assType.assignment,
      difficulty: difficulty.type,
      travis
    });
  await updateStats(id);
  await assignmentPost(id);
};
module.exports = assignmentPost;

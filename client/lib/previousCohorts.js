/* eslint-disable no-console */
const inquirer = require('inquirer');
const config = require('../config');
const request = require('superagent');
const { getToken } = require('../helper/tokens');
const menu = require('./menu');
const gradient = require('gradient-string');

const previousCohorts = async(token, teacher) => {
  const cohorts = await request
    .get(`${config.url}/teachers/${teacher._id}`)
    .set('Authorization', `Bearer ${getToken()}`);
  
  const prevCohorts = cohorts.body.map((c, i) => {
    return gradient.pastel(`cohort${i + 1}: stress: ${c.stress}, sleep: ${c.sleep}, knowledge: ${c.knowledge}`);
  });

  const choice = await inquirer.prompt([
    {
      type: 'list',
      name: 'results',
      message: `Here are your previous cohorts:\n${prevCohorts.join('\n')}`,
      choices: ['Go back']
    }
  ]);
  if(choice.results === 'back') {
    return menu(token, teacher);
  }
};

module.exports = previousCohorts;

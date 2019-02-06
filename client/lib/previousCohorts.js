const inquirer = require('inquirer');
const config = require('../config');
const request = require('superagent');
const { getToken } = require('../helper/tokens');

const previousCohorts = (teacherId) => {
  // console.log(token);
  return request
    .get(`${config.url}/teachers/${teacherId}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .then(({ body }) => {
      const ban = body.map((b, i) => {
        return `cohort${i + 1}: stress: ${b.stress}, sleep: ${b.sleep}, knowledge: ${b.knowledge}`;
      });
      // const { stress, sleep, knowledge } = ban;
      console.log(ban);
      return inquirer.prompt([
        {
          type: 'list',
          name: 'results',
          message: `Here are your previous cohorts:\n${ban.join('\n')}`,
          choices: ([
            {
              name: 'go back',
              value: 'banana'
            }
          ])
        }
      ])
    }).catch(console.log);
};

module.exports = previousCohorts;

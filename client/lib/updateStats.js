const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('../helper/tokens');

const updateStats = (id) => {
  return request
    .get(`${config.url}/cohorts/${id}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .then(res => {
      const { stress, sleep, knowledge } = res.body;
      return inquirer.prompt([
        {
          type: 'list',
          name: 'continue',
          message: `Here are your updated Cohort stats:
              stress: ${stress},
              sleep: ${sleep},
              knowledge: ${knowledge}`,
          choices: [{
            name: 'continue',
            value: 'continue'
          }]
        }
      ]);
    });
};
module.exports = updateStats;

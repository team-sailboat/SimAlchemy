/*eslint-disable no-console*/
const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('../helper/tokens');
const checkAssignLength = require('../lib/checkAssignLength');
const gameOver = require('./gameOver');
const chalk = require('chalk');

const updateStats = (id) => {
  return checkAssignLength(id)
    .then(length => {
      if(length < 5) {
        return request
          .get(`${config.url}/cohorts/${id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .then(res => {
            const { stress, sleep, knowledge } = res.body;
            if(sleep <= 10 && stress >= 90) {
              console.log(chalk.red('You done goof\'d'));
              return gameOver(id);
            } 
            else if(stress >= 100) {
              console.log(chalk.red('You done goof\'d, your cohort got 2 stressed'));
              return gameOver(id);
            } 
            else if(knowledge > 100 && stress < 90) {
              console.log(chalk.green('YOUR COHORT IS SO SMART. YOU WIN'));
              return gameOver(id);
            }
            return inquirer.prompt([
              {
                type: 'list',
                name: 'continue',
                message: 'Here are your updated Cohort stats: ' + chalk.rgb(255, 140, 105)(`stress: ${stress}, sleep: ${sleep}, knowledge: ${knowledge}\r`),
                choices: [{
                  name: 'continue',
                  value: 'continue'
                }]
              }
            ]);
          });
      }
      else {
        return gameOver(id);
      }
    });
};

module.exports = updateStats;

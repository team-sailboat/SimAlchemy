/* eslint-disable no-console */
const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('../helper/tokens');
const figlet = require('figlet');
const chalk = require('chalk');
const gradient = require('gradient-string');

const gameOver = async(id) => {
  const statsAndAggs = await Promise.all([
    request
      .get(`${config.url}/cohorts/${id}`)
      .set('Authorization', `Bearer ${getToken()}`),
    request
      .get(`${config.url}/cohorts/${id}/travis`)
      .set('Authorization', `Bearer ${getToken()}`)
  ]);

  const [stats, aggs] = statsAndAggs;
  const { stress, sleep, knowledge } = stats.body;
  const { min, max, avg } = aggs.body[0];
      
  await inquirer.prompt([
    {
      type: 'list',
      name: 'continue',
      message: 'Here are your FINAL stats: ' + chalk.magenta(`stress: ${stress}, sleep: ${sleep}, knowledge: ${knowledge}\n\n`) +
                  'HERE are your PASSING Travis stats: ' + chalk.rgb(128, 0, 128)(`min: ${min}, max: ${max}, avg: ${avg}\n\n`),
      choices: [{
        name: '༼ つ ಥ_ಥ ༽つ'
      }]
    }
  ]);

  await console.log(gradient.morning(figlet.textSync('GAME OVER', {
    font: 'weird',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  })));

  process.exit();
};

module.exports = gameOver;

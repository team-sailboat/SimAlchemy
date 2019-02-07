const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('../helper/tokens');
const figlet = require('figlet');
const chalk = require('chalk');

const gameOver = (id) => {
  return Promise.all([
    request
      .get(`${config.url}/cohorts/${id}`)
      .set('Authorization', `Bearer ${getToken()}`),
    request
      .get(`${config.url}/cohorts/${id}/travis`)
      .set('Authorization', `Bearer ${getToken()}`)
  ])
    .then(([stats, agg]) => {
      const { stress, sleep, knowledge } = stats.body;
      const { min, max, avg } = agg.body[0];
      return inquirer.prompt([
        {
          type: 'list',
          name: 'continue',
          message: 'Here are your FINAL stats:' + chalk.magenta(`\nstress: ${stress}, sleep: ${sleep}, knowledge: ${knowledge}\n\n`) +
                  'HERE are your PASSING Travis stats:' + chalk.rgb(128, 0, 128)(`\nmin: ${min}, max: ${max}, avg: ${avg}\n\n`),
          choices: [{
            name: '༼ つ ಥ_ಥ ༽つ',
          }]
        }
      ]);
    }).then(() => {
      console.log(figlet.textSync('GAME OVER', {
        font: 'weird',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      }));
      process.exit();
      // return menu(getToken(), getTeach());
    });
};

module.exports = gameOver;

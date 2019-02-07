const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const {
  getToken,
  // getTeach
} = require('../helper/tokens');
// const menu = require('./menu');
const figlet = require('figlet');

const gameOver = (id) => {
  return request
    .get(`${config.url}/cohorts/${id}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .then(res => {
      const { stress, sleep, knowledge } = res.body;
      return inquirer.prompt([
        {
          type: 'list',
          name: 'continue',
          message: `Here are your FINAL stats:
                  stress: ${stress},
                  sleep: ${sleep},
                  knowledge: ${knowledge}`,
          choices: [{
            name: 'Return to menu',
            value: 'menu'
          }]
        }
      ]);
    }).then(() => {
      console.log(figlet.textSync('GAME OVER\r', {
        font: 'weird',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      }));
      process.exit();
      // return menu(getToken(), getTeach());
    });
};

module.exports = gameOver;

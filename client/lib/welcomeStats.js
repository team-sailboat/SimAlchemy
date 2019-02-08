/* eslint-disable no-console */
const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const assignmentPost = require('./assignment');
const chalk = require('chalk');
const gradient = require('gradient-string');
const figlet = require('figlet');

const welcomeStats = (token, id) => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'welcome',
      message: gradient.fruit('Congrats, you\'re hired!') + ' You\'re an instructor at SimAlchemy and it’s the first day of class. Your job is to help your cohort survive by keeping their stress low and increasing their knowledge. Are you ready to begin?\n',
      choices: [
        {
          name: 'YES',
          value: 'yes'
        },
        {
          name: 'NO',
          value: 'no'
        }
      ]
    }
  ])
    .then(choice => {
      if(choice.welcome === 'no') {
        return process.exit();
      }
      else {
        let stress, sleep, knowledge;
        return request
          .post(`${config.url}/cohorts`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            teacher: id,
            stress,
            sleep,
            knowledge
          })
          .then(({ body }) => {
            console.log(gradient.mind(figlet.textSync('Let\'s GO!', {
              horizontalLayout: 'default',
              verticalLayout: 'default'
            })));
            return request
              .get(`${config.url}/cohorts/${body._id}`)
              .set('Authorization', `Bearer ${token}`)
              .then(res => {
                const { stress, sleep, knowledge } = res.body;
                return inquirer.prompt([
                  {
                    type: 'list',
                    name: 'continue',
                    message: 'Here are your cohorts stats: ' + chalk.rgb(155, 155, 155).inverse(`stress: ${stress}, sleep: ${sleep}, knowledge: ${knowledge}\n\n`),
                    choices: [{
                      name: 'continue',
                      value: 'continue'
                    }]
                  }
                ])
                  .then(() => {
                    return assignmentPost(body._id);
                  });
              });
          });
      }
    });
};

module.exports = welcomeStats;

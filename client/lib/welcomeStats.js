/* eslint-disable no-console */
const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('../helper/tokens');
const assignmentPost = require('./assignment');

const welcomeStats = (id) => {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'welcome',
      message: 'Congrats, you’re hired! You’re an instructor at SimAlchemy and it’s the first day of class. Your job is to help your cohort survive by keeping their stress low and increasing their knowledge. Are you ready to begin?'
    }
  ])
    .then(welcome => {
      if(welcome) {
        return request
          .get(`${config.url}/cohorts/${id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .then(res => {
            const { stress, sleep, knowledge } = res.body;
            return inquirer.prompt([
              {
                type: 'list',
                name: 'continue',
                message: `Here are your cohorts stats: 
                stress: ${stress},
                sleep: ${sleep},
                knowledge: ${knowledge}`,
                choices: [{
                  name: 'continue',
                  value: 'continue'
                }]
              }
            ])
              .then(() => {
                return assignmentPost(id);
              });
          });
      }
    });
};


module.exports = welcomeStats;

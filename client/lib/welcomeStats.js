/* eslint-disable no-console */
const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const assignmentPost = require('./assignment');

const welcomeStats = (token, id) => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'welcome',
      message: 'Congrats, you’re hired! You’re an instructor at SimAlchemy and it’s the first day of class. Your job is to help your cohort survive by keeping their stress low and increasing their knowledge. Are you ready to begin?',
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
            return request
              .get(`${config.url}/cohorts/${body._id}`)
              .set('Authorization', `Bearer ${token}`)
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
                    return assignmentPost(body._id);
                  });
              });
          });
      }
    });
};

module.exports = welcomeStats;

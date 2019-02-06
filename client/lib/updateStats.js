const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('../helper/tokens');

const updateStats = (id, difficulty) => {
  return request
    .get(`${config.url}/cohorts/${id}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .then(({ body }) => {
      const { sleep, knowledge, stress } = body;
      let newSleep, newKnowledge, newStress;
      if(difficulty.type === 'easy') {
        newSleep = sleep * .2;
        newKnowledge = knowledge * .2;
        newStress = stress * .2;
      }
      else if(difficulty.type === 'medium') {
        newSleep = sleep * .2;
        newKnowledge = knowledge * .2;
        newStress = stress * .2;
      }
      else {
        newSleep = sleep * .2;
        newKnowledge = knowledge * .2;
        newStress = stress * .2;
      }
      return request
        .patch(`${config.url}/cohorts/${id}`)
        .set('Authorization', `Bearer ${getToken()}`)
        .send({
          sleep: newSleep,
          knowledge: newKnowledge,
          stress: newStress
        });
    })
    .then(() => {
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
    });
};
module.exports = updateStats;

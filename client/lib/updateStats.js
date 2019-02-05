const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');
const { getToken } = require('../helper/tokens');
const Cohort = require('../../lib/models/Cohort');

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
      console.log('here', newSleep, newKnowledge, newStress);
    });

  
  
  // let sleep, knowledge, stress;

  // if(difficulty.type === 'hard') {
  //   sleep *= .2;
  //   knowledge *= .2;
  //   stress *= .2;
  // }
  // console.log('15', sleep, knowledge, stress);
  // return request
  //   .patch(`${config.url}/cohorts/${id}`)
  //   .set('Authorization', `Bearer ${getToken()}`)
  //   .send({

  //   })
    

  // return inquirer.prompt([
  //   {
  //     type:'list',
  //     name: 'continue',
  //     message: 'Here are your updated stats'
  //   }
  // ]);
};
module.exports = updateStats;

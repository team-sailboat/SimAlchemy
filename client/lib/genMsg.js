/*eslint-disable no-console*/
const config = require('../config');
const request = require('superagent');
const { getToken } = require('../helper/tokens');
const figlet = require('figlet');
const chalk = require('chalk');
const gradient = require('gradient-string');

const genMsg = id => {
  return request
    .get(`${config.url}/cohorts/${id}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .then(res => {
      const { stress, sleep, knowledge } = res.body;
      if(stress === 25 && sleep === 100) {
        return chalk.green('It\'s time to post your first assignment. Choose an assignment:\n');
      }
      else if((stress > 25 && stress <= 30) && (sleep >= 90 && sleep < 100)) {
        console.log(gradient.mind(figlet.textSync('Woohoo!!', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })));
        return chalk.green('Good Job! Your cohort isn\'t too stressed yet. Time for another assignment!');
      }
      else if((knowledge >= 25 && knowledge <= 50) && (sleep >= 55 && sleep <= 65)) {
        console.log(gradient.mind(figlet.textSync('Uh-Oh...', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })));
        return chalk.yellow('Your cohort is losing sleep fast and they are having trouble retaining knowledge. It might be time for a lecture to review!');
      }
      else if((knowledge >= 50 && knowledge <= 60) && (sleep <= 75 && sleep >= 40)) {
        console.log(gradient.mind(figlet.textSync('Saweet!!', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })));
        return chalk.yellow('Your cohort is learning SO MUCH but they\'re exhausted! How about something a little easier?');
      }
      else if(stress >= 70) {
        console.log(gradient.mind(figlet.textSync('Oh no!!!', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })));
        return chalk.red('Uh Oh, peeps be stressssed! Better think about this next assignment carefully.');
      }
      else if(knowledge >= 65 && sleep >= 70 && stress <= 65) {
        console.log(gradient.mind(figlet.textSync('Yeah baby!!', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })));
        return chalk.green('You\'re doing great! Your cohort is on fire and their stress and sleep levels are healthy.');
      }
      else if((stress >= 85) && (sleep <= 80)) {
        console.log(gradient.mind(figlet.textSync('YIKES', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })));
        return chalk.red('This isn\'t looking good. Your cohort has been working nonstop. At this rate they\'re approaching burnout quickly. AARRGGHH!');
      }
      else {
        console.log(gradient.mind(figlet.textSync('cool dude', {
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })));
        return 'Try another assignment!\n';
      }
    });
};

module.exports = genMsg;

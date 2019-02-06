const inquirer = require('inquirer');
const welcomeStats = require('./welcomeStats');

const menu = (token, teacher) => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
      message: `Hi, ${teacher.username}! What would you like to do today?`,
      choices: [
        {
          name: 'View previous cohorts',
          value: 'cohort'
        },
        {
          name: 'Start a new game',
          value: 'game'
        }
      ]
    }
  ])
    .then(choice => {
      if(choice.menu === 'game') {
        return welcomeStats(token, teacher._id);
      }
    });
};

module.exports = menu;

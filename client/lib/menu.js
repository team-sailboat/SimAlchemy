const inquirer = require('inquirer');
const welcomeStats = require('./welcomeStats');
const previousCohorts = require('./previousCohorts');

const menu = async(token, teacher) => {
  const prompt = await inquirer.prompt([
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
  ]);
  if(prompt.menu === 'game') {
    await welcomeStats(token, teacher._id);
  } else {
    await previousCohorts(token, teacher);
  }
  return menu(token, teacher);
};

module.exports = menu;

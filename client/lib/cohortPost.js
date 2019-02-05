/* eslint-disable no-console */
const config = require('../config');
const request = require('superagent');
const inquirer = require('inquirer');

const cohortPost = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: '',
      message: 'Congrats, you’re hired! You’re an instructor at SimAlchemy. It’s the first day of class. It\'s time to begin!'
    }
  ]);
};

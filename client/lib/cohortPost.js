/* eslint-disable no-console */
// const config = require('../config');
// const request = require('superagent');
const inquirer = require('inquirer');

const cohortPost = (id) => {
  console.log(id);
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'welcome',
      message: 'Congrats, you’re hired! You’re an instructor at SimAlchemy and it’s the first day of class. Your job is to help your cohort survive by keeping their stress low and increasing their knowledge. Are you ready to begin?'
    }
  ]);
};


module.exports = cohortPost;

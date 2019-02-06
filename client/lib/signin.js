/*eslint-disable no-console*/

const config = require('../config');
const inquirer = require('inquirer');
const request = require('superagent');
const { setToken } = require('../helper/tokens');
const welcomeStats = require('./welcomeStats');

module.exports = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Username'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password',
      mask: true,
      validate: function(value) {
        if(value) {
          return true;
        }
        return 'Please enter a password';
      }
    }
  ])
    .then(({ username, password }) => {
      return request
        .post(`${config.url}/auth/signin`)
        .send({ username, password });
    })
    .then(res => {
      return Promise.all([
        setToken(res.body.token),
        res.body.foundTeacher
      ])
        .then(([token, foundTeacher]) => {
          return inquirer.prompt([
            {
              type: 'list',
              name: 'menu',
              message: `Welcome back ${foundTeacher.username} to SimAlchemy! What would you like to do today?`,
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
                console.log('token', token);
                console.log('fT', foundTeacher._id);
                return welcomeStats(token, 
                  foundTeacher._id);

              }
            });
        });
    });
    

};

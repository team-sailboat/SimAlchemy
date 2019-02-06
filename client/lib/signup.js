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
        .post(`${config.url}/auth/signup`)
        .send({ username, password });
    })
    .then(res => {
      return Promise.all([
        setToken(res.body.token),
        res.body.teacher._id
      ])
        .then(([token, id]) => {
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
              return welcomeStats(body._id);
            });
        });
    });

};



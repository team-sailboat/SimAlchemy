const config = require('../config');
const inquirer = require('inquirer');
const request = require('superagent');
const { setToken } = require('../helper/tokens');

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
      mask: true
    }
  ])
    .then(({ username, password }) => {
      return request
        .post(`${config.url}/auth/signin`)
        .send({ username, password });
    })
    .then(res => {
      setToken(res.body.token);
    });

};

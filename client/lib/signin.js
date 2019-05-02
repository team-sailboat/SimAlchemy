/*eslint-disable no-console*/
const config = require('../config');
const inquirer = require('inquirer');
const request = require('superagent');
const { setToken, setTeach } = require('../helper/tokens');
const menu = require('./menu');

module.exports = async() => {
  const userInfo = await inquirer.prompt([
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
  ]);

  const { username, password } = userInfo;

  const signIn = await request
    .post(`${config.url}/auth/signin`)
    .send({ username, password })
    .catch(console.log);
    

  const tokenTeach = await Promise.all([
    setToken(signIn.body.token),
    setTeach(signIn.body.foundTeacher)
  ]);

  const [token, foundTeacher] = tokenTeach;

  return menu(token, foundTeacher);
};
    

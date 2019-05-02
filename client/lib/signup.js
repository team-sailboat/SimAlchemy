/*eslint-disable no-console*/
const config = require('../config');
const inquirer = require('inquirer');
const request = require('superagent');
const { setToken, setTeach } = require('../helper/tokens');
const welcomeStats = require('./welcomeStats');

module.exports = async() => {
  const signUp = await inquirer.prompt([
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

  const { username, password } = signUp;

  const signIn =  await request
    .post(`${config.url}/auth/signup`)
    .send({ username, password });

  const setting = await Promise.all([
    setToken(signIn.body.token),
    setTeach(signIn.body.teacher)
  ]);

  const [token, teacher] = setting;
  
  await welcomeStats(token, teacher._id);
};

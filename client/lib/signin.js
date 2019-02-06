/*eslint-disable no-console*/

const config = require('../config');
const inquirer = require('inquirer');
const request = require('superagent');
const { setToken } = require('../helper/tokens');
// const Cohort = require('../../lib/models/Cohort');
// const app = require('../../lib/app');

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
        res.body.foundTeacher._id
      ]);
      // .then(([token, id]) => {
      //   console.log('BIGOBJECT', Cohort
      //     .find({ teacher: id })
      //     .lean());
      //   return Cohort
      //     .find({ teacher: id })
      //     // .populate('teacher', { username: true })
      //     .then(res => {
      //       console.log('body', res.body);
      //     });
      // return request
      //   .get(`${config.url}/cohorts`)
      //   .set('Authorization', `Bearer ${token}`);

    //     });
    });
    

};

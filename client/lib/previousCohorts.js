// const inquirer = require('inquirer');
const config = require('../config');
const request = require('superagent');
const { getToken } = require('../helper/tokens');

const previousCohorts = (teacherId) => {
  // console.log(token);
  return request
    .get(`${config.url}/teachers/${teacherId}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .then(res => {
      console.log(res.body);
    }).catch(console.log);
};

module.exports = previousCohorts;

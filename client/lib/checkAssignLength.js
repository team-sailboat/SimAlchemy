/* eslint-disable no-console */
const config = require('../config');
const request = require('superagent');
const { getToken } = require('../helper/tokens');

const checkAssignLength = (id) => {
  return request
    .get(`${config.url}/cohorts/${id}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .then(cohort => {
      const tries = 5 - cohort.body.assignments.length;
      if(tries === 1) {
        console.log(tries + ' try left');
      } else if(tries > 1 && tries < 5) {
        console.log(tries + ' tries left');
      } else if(tries === 0) {
        console.log('No more tries left');
      }
      return cohort.body.assignments.length;
    });
};

module.exports = checkAssignLength;

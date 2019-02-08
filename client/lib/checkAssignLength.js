const config = require('../config');
const request = require('superagent');
const { getToken } = require('../helper/tokens');

const checkAssignLength = (id) => {
  return request
    .get(`${config.url}/cohorts/${id}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .then(cohort => cohort.body.assignments.length);
};

module.exports = checkAssignLength;

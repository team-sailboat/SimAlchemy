const config = require('../config');
const request = require('superagent');
const { getToken } = require('../helper/tokens');

const genMsg = id => {
  return request
    .get(`${config.url}/cohorts/${id}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .then(res => {
      const { stress, sleep } = res.body;
      if(stress > 0 && sleep > 0) {
        return 'Choose an assignment:';
      }
      // else if(blahblah) {}
    });
};

module.exports = genMsg;

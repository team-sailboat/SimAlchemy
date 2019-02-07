const config = require('../config');
const request = require('superagent');
const { getToken } = require('../helper/tokens');

const genMsg = id => {
  return request
    .get(`${config.url}/cohorts/${id}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .then(res => {
      const { stress, sleep, knowledge } = res.body;
      if(stress === 25 && sleep === 100) {
        return 'It\'s time to post your first assignment. Choose an assignment:';
      }
      else if((stress > 25 && stress <= 35) && (sleep >= 90 && sleep < 100)) {
        return 'Good Job! Your cohort isn\'t too stressed yet. Time for another assignment!';
      }
      else if((knowledge >= 50 && knowledge <= 60) && (sleep <= 50 && sleep >= 40)) {
        return 'Your cohort is learning SO MUCH but they\'re exhausted! How about something a little easier?';
      }
      else if(stress >= 70) {
        return 'Uh Oh, peeps be stressssed! Better think about this next assignment carefully.';
      }
      else if(knowledge >= 75 && sleep >= 50 && stress <= 50) {
        return 'You\'re doing great! Your cohort is on fire and their stress and sleep levels are healthy.';
      }
      else if((stress >= 85) && (sleep <= 20)) {
        return 'This isn\'t looking good. Your cohort has been working nonstop. At this rate they\'re approaching burnout quickly. AARRGGHH!';
      }
      else return 'Try another assignment!';
      // else if(blahblah) {}
    });
};

module.exports = genMsg;

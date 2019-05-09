// By placing these values in there own object it becomes
// easier to reason about and update. Also, this is now
// much easier to write a test for. You can pretty easily
// write some code that shows you the results of all possible
// games
const lab = {
  easy: {
    sleep: 0.9,
    knowledge: 1,
    stress: 1.1
  },
  medium: {
    sleep: 0.8,
    knowledge: 1.5,
    stress: 1.4
  },
  hard: {
    sleep: 0.7,
    knowledge: 1.6,
    stress: 1.6
  }
};

const reading = {
  easy: {
    sleep: 0.8,
    knowledge: 1.1,
    stress: 1.1
  },
  medium: {
    sleep: 0.7,
    knowledge: 1.5,
    stress: 1.4
  },
  hard: {
    sleep: 0.6,
    knowledge: 1.7,
    stress: 1.6
  }
};

const lecture = {
  easy: {
    sleep: 1,
    knowledge: 1.2,
    stress: 1.1
  },
  medium: {
    sleep: 1,
    knowledge: 1.7,
    stress: 1.4
  },
  hard: {
    sleep: 1,
    knowledge: 1.8,
    stress: 1.6
  }
};

const statsUpdater = { lab, reading, lecture };

module.exports = (assignment, cohort) => {
  const { name, difficulty } = assignment;
  const multipliers = statsUpdater[name][difficulty];
  return Object.keys(multipliers).map(key => {
    return Math.floor(cohort[key] * multipliers[key]);
  });
};

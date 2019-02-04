require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Teacher = require('../../lib/models/Teacher');

const createTeacher = (username, password) => {
  return Teacher.create({
    username,
    password
  });
};

describe('Teacher', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });
  afterAll(done => {
    mongoose.connection.close();
    done();
  });
  it('validates a good model', () => {
    const teacher = new Teacher({
      username: 'martypdx'
    });
    expect(teacher.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      username: 'martypdx'
    });
  });
  it('requires a username', () => {
    const teacher = new Teacher({});
    const errors = teacher.validateSync().errors;
    expect(errors).toBeDefined();
    expect(errors.username.message).toEqual('Username required');
  });
  it('stores a temp password', () => {
    const teacher = new Teacher({
      username: 'roboryan',
      password: 'password'
    });
    expect(teacher._tempPassword).toEqual('password');
  });
  it('has a passwordHash', () => {
    return createTeacher('robocop', 'password')
      .then(teacher => {
        expect(teacher.passwordHash).toEqual(expect.any(String));
      });
  });
  it('can compare passwords', () => {
    return createTeacher('featherMorhead', 'password')
      .then(teacher => {
        return teacher.compare('password');
      })
      .then(res => {
        expect(res).toBeTruthy();
      });
  });
  it('can detect bad passwords', () => {
    return createTeacher('featherMorhead', 'password')
      .then(teacher => {
        return teacher.compare('badpassword');
      })
      .then(res => {
        expect(res).toBeFalsy();
      });
  });
});

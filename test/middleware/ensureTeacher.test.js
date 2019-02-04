require('dotenv').config();
// const { tokenize } = require('../../lib/utils/token');
const { bearerToken } = require('../../lib/middleware/ensureTeacher');

describe('ensureTeacher', () => {
  it('can get a bearer token', () => {
    const req = {
      get: () => 'Bearer abcd123'
    };
    const next = jest.fn();
    bearerToken(req, {}, next);
    expect(req.token).toEqual('abcd123');
    expect(next).toHaveBeenCalled();
  });
});

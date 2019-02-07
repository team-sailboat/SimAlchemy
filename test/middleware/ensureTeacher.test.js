require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const { bearerToken, ensureAuth } = require('../../lib/middleware/ensureTeacher');

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

  it('can ensure a token is authorized', () => {
    const token = tokenize({ username: 'cari420' });
    const req = { token };
    const next = jest.fn();

    ensureAuth(req, {}, next)
      .then(() => {
        expect(req.teacher).toEqual({ username: 'cari420' });
        expect(next).toHaveBeenCalled();
      });
  });
});

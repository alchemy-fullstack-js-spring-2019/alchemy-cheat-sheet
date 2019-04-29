const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {
  it('has a username, password, and role', () => {
    const user = new User({
      username: 'ryan',
      password: 'password',
      role: 'contributor'
    });

    expect(user.toJSON()).toEqual({
      username: 'ryan',
      role: 'contributor',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has required username and role', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.username.message).toEqual('Path `username` is required.');
    expect(errors.role.message).toEqual('Path `role` is required.');
  });
});

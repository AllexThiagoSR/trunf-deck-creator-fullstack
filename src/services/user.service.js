const { Op } = require('sequelize');
const { User } = require('../models');

const login = async (password, username = '', email = '') => {
  const user = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
  if (!user || user.password !== password) {
    return { status: 404, data: { message: 'Username, email or password incorrect' } };
  }
  return { status: 200, data: user };
};

module.exports = { login };

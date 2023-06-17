const Sequelize = require('sequelize');
const { User } = require('../models');
const config = require('../config/config');

const { Op } = Sequelize;

const env = process.env.NODE_ENV;

const sequelize = new Sequelize(config[env]);

const login = async (password, username = '', email = '') => {
  try {
    const user = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
    if (!user || user.password !== password) {
      return { status: 404, data: { message: 'Username, email or password incorrect' } };
    }
    return { status: 200, data: user };
  } catch (error) {
    return { status: 500, data: { message: 'Something went wrong' } };
  }
};

const create = async (username, email, password, image) => {
  try {
    const result = await sequelize.transaction(async (transaction) => {
      const user = await User.create(
        { username, email, password, image, roleId: 2 },
        { attributes: { exclude: ['password'] }, transaction },
      );
      return { status: 201, data: user };
    });
    return result;
  } catch (error) {
    return { status: 500, data: { message: 'Something went wrong' } };
  }
};

module.exports = { login, create };

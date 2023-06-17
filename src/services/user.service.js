const Sequelize = require('sequelize');
const { User, Deck, Role } = require('../models');
const config = require('../config/config');
const { createToken } = require('../utils/token');
const { encryptPassword, isRightPassword } = require('../utils/bcryptUtils');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

const login = async (password, email = '') => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !isRightPassword(password, user.password)) {
      return { status: 404, data: { message: 'Username, email or password incorrect' } };
    }
    const token = createToken({ id: user.id, username: user.username, isAdm: user.roleId === 1 });
    return { status: 200, data: { token } };
  } catch (error) {
    return { status: 500, data: { message: 'Something went wrong' } };
  }
};

const createUser = async (user, transaction) => {
  const { username, email, image, id, role } = await User.create(
    { ...user, roleId: 2 },
    { transaction },
  );
  return { id, email, image, username, role };
};

const create = async ({ username, email, password, image }) => {
  try {
    const result = await sequelize.transaction(async (transaction) => {
      const user = await createUser(
        { username, email, password: encryptPassword(password), image },
        transaction,
      );
      return { status: 201, data: user }; 
    });
    return result;
  } catch (error) {
    if (error.original.code === 'ER_DUP_ENTRY') {
      return { status: 409, data: { message: 'This email is already registered' } };
    }
    return { status: 500, data: { message: 'Something went wrong' } };
  }
};

const getUserById = async (id) => {
  const user = await User.findOne({ 
    where: { id },
    include: [
      { model: Deck, as: 'decks', attributes: { exclude: ['userId'] } },
      { model: Role, as: 'role', attributes: { exclude: ['id'] } },
    ],
    attributes: { exclude: ['password', 'roleId'] },
  });
  return { status: 200, data: user };
};

module.exports = { login, create, getUserById };

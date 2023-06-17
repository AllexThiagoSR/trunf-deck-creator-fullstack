const { userService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await userService.login(password, email);
  return res.status(status).json(data);
};

const create = async (req, res) => {
  const { status, data } = await userService.create(req.body);
  return res.status(status).json(data);
};

const getUserById = async (req, res) => {
  const { status, data } = await userService.getUserById(req.params.id);
  return res.status(status).json(data);
};

const getAll = async (req, res) => {
  const { status, data } = await userService.getAll(req.query.username);
  return res.status(status).json(data);
};

module.exports = { login, create, getUserById, getAll };

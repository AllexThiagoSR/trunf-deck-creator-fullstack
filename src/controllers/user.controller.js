const { userService } = require('../services');

const login = async (req, res) => {
  const { username, email, password } = req.body;
  const { status, data } = await userService.login(password, username, email);
  return res.status(status).json(data);
};

const create = async (req, res) => {
  const { status, data } = await userService.create(req.body);
  return res.status(status).json(data);
};

module.exports = { login, create };

const { deckeService } = require('../services');

const create = async (req, res) => {
  const { id } = req.user;
  const { status, data } = await deckeService.create({ ...req.body, userId: id });
  return res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await deckeService.getAll();
  return res.status(status).json(data); 
};

module.exports = { create, getAll };

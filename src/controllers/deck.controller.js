const { deckeService } = require('../services');

const create = async (req, res) => {
  const { status, data } = await deckeService.create(req.body);
  return res.status(status).json(data);
};

module.exports = { create };

const { cardService } = require('../services');

const getAll = async (req, res) => {
  const { q, rarity, isTrunfo, limit, page } = req.query;
  const { status, data } = await cardService.getAll(rarity, { quantity: limit, page }, isTrunfo, q);
  return res.status(status).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await cardService.update(
    id,
    req.user,
    req.body,
  );
  return res.status(status).json(data);
};

const create = async (req, res) => {
  const { status, data } = await cardService.create(req.body);
  return res.status(status).json(data);
};

module.exports = { getAll, update, create };

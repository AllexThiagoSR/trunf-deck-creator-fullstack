const { cardService } = require('../services');

const getAll = async (req, res) => {
  const { q, rarity, isTrunfo, limit, page } = req.query;
  const { status, data } = await cardService.getAll(rarity, { quantity: limit, page }, isTrunfo, q);
  return res.status(status).json(data);
};

module.exports = { getAll };

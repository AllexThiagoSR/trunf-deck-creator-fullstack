const { cardService } = require('../services');

const getAll = async (req, res) => {
  const { q, rarity, isTrunfo } = req.query;
  const { status, data } = await cardService.getAll(rarity, isTrunfo, q);
  return res.status(status).json(data);
};
module.exports = { getAll };

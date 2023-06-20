const { Op } = require('sequelize');
const { Card } = require('../models');

const INTERNAL_ERROR = { status: 500, data: { message: 'Internal server error' } };

const createCard = async (cardInfo) => {
  const {
    name, description, deckId,
    image, rarity, isTrunfo,
    attributes: [one, two, three],
  } = cardInfo;
  const card = await Card.create({
    name,
    description,
    image,
    rarity,
    isTrunfo,
    deckId,
    attributeOne: one,
    attributeTwo: two,
    attributeThree: three,
  });
  return card;
};

const create = async (cardInfo) => {
  try {
    const card = await createCard(cardInfo);
    return { status: 201, data: card };
  } catch (error) {
     return INTERNAL_ERROR;
  }
};

const getAll = async (rarity, isTrunfo = '', q = '') => {
  const rare = rarity ? [rarity] : [1, 2, 3];
  const trunfo = typeof isTrunfo !== 'boolean' ? {} : { isTrunfo: { [Op.is]: isTrunfo } };
  try {
    const cards = await Card 
      .findAll({ where: { rarity: { [Op.in]: rare }, name: { [Op.substring]: q }, ...trunfo } });
    return { status: 200, data: cards };
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

module.exports = { create, getAll };

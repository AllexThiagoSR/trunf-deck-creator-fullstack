const { Op } = require('sequelize');
const { Card, Deck } = require('../models');

const INTERNAL_ERROR = { status: 500, data: { message: 'Internal server error' } };

const createCard = async (cardInfo) => {
  const {
    name, description, deckId,
    image, rarityId, isTrunfo,
    attributes: [one, two, three],
  } = cardInfo;
  const card = await Card.create({
    name,
    description,
    image,
    rarityId,
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
  const trunfo = isTrunfo !== 'true' && isTrunfo !== 'false'
    ? {} : { isTrunfo: { [Op.is]: isTrunfo === 'true' } };
  try {
    const cards = await Card 
      .findAll({ where: { rarityId: { [Op.in]: rare }, name: { [Op.substring]: q }, ...trunfo } });
    return { status: 200, data: cards };
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

const update = async (id, loggedUser, { name, description, image, rarityId, deckId }) => {
  try {
    const deck = await Deck.findByPk(deckId);
    const card = await Card.findByPk(id);
    if (!card) return { status: 404, data: { message: 'Card not found' } };
    if (deck.userId !== loggedUser.id) {
      return { status: 401, data: { message: 'This deck do not belong to this user' } };
    }
    await Card.update({ name, description, image, rarityId });
    return { status: 200, data: { message: 'Card updated' } };
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

const deleteCard = async (id) => {
  try {
    const card = await Card.findByPk(id);
    if (!card) return { status: 404, data: { message: 'Card not found' } };
    await Card.destroy({ where: { id } });
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

module.exports = { create, getAll, deleteCard, update };

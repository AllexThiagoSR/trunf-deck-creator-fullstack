const { Deck, User, Card } = require('../models');

const create = async (deckInfo) => {
  const { 
    name,
    attributeOne,
    attributeTwo,
    attributeThree,
    userId,
  } = deckInfo;
  const deck = await Deck.create({
    name,
    attributeOne,
    attributeTwo,
    attributeThree,
    userId,
  });
  return { status: 201, data: deck };
};

const getAll = async () => {
  const decks = await Deck.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['id', 'roleId'] } },
      { model: Card, as: 'cards' },
    ],
    attributes: {
      exclude: ['userId'],
    },
  });
  return { status: 200, data: decks };
};

module.exports = { create, getAll };

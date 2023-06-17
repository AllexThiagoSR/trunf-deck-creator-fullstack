const { Deck } = require('../models');

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

module.exports = { create };

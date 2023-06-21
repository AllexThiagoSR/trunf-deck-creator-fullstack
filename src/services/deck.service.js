const { Deck, User, Card } = require('../models');

const INTERNAL_SERVER_ERROR = { status: 500, data: { message: 'Internal server error' } };

const create = async (deckInfo) => {
  try {
    const { id } = await Deck.create(deckInfo);
    const deck = await Deck.findByPk(id);
    return { status: 201, data: deck };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

const getAll = async () => {
  try {
    const decks = await Deck.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['id', 'roleId', 'password', 'email'] } },
        { model: Card, as: 'cards', attributes: { exclude: ['deckId'] } },
      ],
      attributes: {
        exclude: ['userId'],
      },
    });
    return { status: 200, data: decks };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

module.exports = { create, getAll };

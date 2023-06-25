const { Deck, User, Card, Rarity } = require('../models');

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
  // Adicionar filtro e paginação na rota de obter todos os decks
  try {
    const decks = await Deck.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['id', 'roleId', 'password', 'email'] } },
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

const getById = async (id) => {
  try {
    const deck = await Deck.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['id', 'roleId', 'password', 'email'] } },
        {
          model: Card, 
          as: 'cards',
          attributes: { exclude: ['deckId'] },
          include: { model: Rarity, as: 'rarity', attributes: { exclude: ['id'] } },
        },
      ],
      attributes: { exclude: ['userId'] },
    });
    return { status: 200, data: deck };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

const update = async (id, name, [one, two, three], loggedUser) => {
  try {
    const deck = await Deck.findByPk(id);
    if (deck.userId !== loggedUser.id) {
      return { status: 401, data: { message: 'This deck do not belong to this user' } };
    }
    await Deck.update({ 
      name, attributeOne: one, attributeTwo: two, attributeThree: three }, { where: { id },
    });
    return { status: 200, data: { message: 'Deck updated' } };
  } catch (error) {
    console.log(error);
    return INTERNAL_SERVER_ERROR;
  }
};

const deleteDeck = async (id, loggedUser) => {
  try {
    const deck = await Deck.findByPk(id);
    if (deck.userId !== loggedUser.id) {
      return { status: 401, data: { message: 'This deck do not belong to this user' } };
    }
    await Deck.destroy({ where: { id } });
    return { status: 200, data: { message: 'Deck deleted' } };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

// const getDeckByUser = async (user) => {};

module.exports = { create, getAll, update, getById, deleteDeck };

const { Op } = require('sequelize');
const { Deck, User, Card, Rarity } = require('../models');

const INTERNAL_SERVER_ERROR = { status: 500, data: { message: 'Internal server error' } };

const create = async (deckInfo) => {
  try {
    const { id } = await Deck.create(deckInfo);
    const deck = await Deck.findByPk(id, {
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['id', 'roleId', 'password', 'email'] },
      }
    });
    return { status: 201, data: deck };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

const makePartition = (quantity = 15, page = 1) => ({
  limit: parseInt(quantity, 10),
  offset: (parseInt(page, 10) - 1) * parseInt(quantity, 10),
});

const getDecks = async (username, name, { limit, offset }) => {
  const decks = await Deck.findAll({
    include: [
      { 
        model: User, 
        as: 'user',
        attributes: { exclude: ['id', 'roleId', 'password', 'email'] },
        where: { username: { [Op.substring]: username } },
      },
    ],
    attributes: { exclude: ['userId', 'attributeOne', 'attributeTwo', 'attributeThree'] },
    where: { name: { [Op.substring]: name } },
    limit,
    offset,
  });
  return decks;
};

const getAll = async ({ quantity, page }, username = '', name = '') => {
  try {
    const { limit, offset } = makePartition(quantity, page);
    const data = await getDecks(username, name, { limit, offset });
    return { status: 200, data };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

const getById = async (id, user) => {
  try {
    const deck = await Deck.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['roleId', 'password', 'email'] } },
        {
          model: Card, 
          as: 'cards',
          attributes: { exclude: ['deckId'] },
          include: { model: Rarity, as: 'rarity', attributes: { exclude: ['id'] } },
        },
      ],
      attributes: { exclude: ['userId'] },
    });

    if (!deck) return { status: 404, data: { message: 'Deck not found ' } };
    return { status: 200, data: { deck, canEdit: user.id === deck.user.id } };
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

const getDeckByUserId = async (userId) => {
  try {
    const decks = await Deck
      .findAll({ where: { userId }, attributes: { exclude: ['userId', 'created', 'updated'] } });
    return { status: 200, data: decks };
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

module.exports = { create, getAll, update, getById, getDeckByUserId, deleteDeck };

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

const deckExists = async (deckId) => Boolean(await Deck.findByPk(deckId));

const hasTrunfo = async ({ deckId, isTrunfo }) => isTrunfo && Boolean(
  await Card.findOne({ where: { deckId, isTrunfo: true } }),
);

const attributesIsOk = ({ attributes }) => {
  const maxSum = 210;
  const attributesIsInRange = attributes.every((value) => (value >= 0 && value <= 90));
  console.log(attributesIsInRange);
  const sumIsInRange = attributes.reduce((acc, currValue) => acc + currValue, 0) < maxSum;
  return attributesIsInRange && sumIsInRange;
};

const create = async (cardInfo) => {
  try {
    if (!(await deckExists(cardInfo.deckId))) {
      return { status: 404, data: { message: 'Deck not found' } };
    }
    if ((await hasTrunfo(cardInfo))) {
      return { status: 409, data: { message: 'This deck already have a trunfo' } };
    }
    if (!attributesIsOk(cardInfo)) {
      return { status: 409, data: { message: 'Attributes rules inflicted' } };
    }
    const card = await createCard(cardInfo);
    return { status: 201, data: card };
  } catch (error) {
     return INTERNAL_ERROR;
  }
};

const makePartition = (quantity = 15, page = 1) => ({
  limit: quantity,
  offset: (Number(page) - 1) * quantity,
  nextPage: Number(page) + 1,
});

const makeFilters = (rarity, isTrunfo, q) => {
  const rare = rarity ? [rarity] : [1, 2, 3];
  const trunfo = isTrunfo !== 'true' && isTrunfo !== 'false'
    ? {} : { isTrunfo: { [Op.is]: isTrunfo === 'true' } };
  return { rarityId: { [Op.in]: rare }, name: { [Op.substring]: q }, ...trunfo };
};

const getAll = async (rarity, { quantity, page }, isTrunfo = '', q = '') => {
  try {
    const { limit, offset, nextPage } = makePartition(quantity, page);
    const { count, rows: cards } = await Card.findAndCountAll({ 
      where: makeFilters(rarity, isTrunfo, q),
      order: ['id'],
      limit,
      offset,
    });
    const next = (offset + limit) < count ? `http://localhost:3001/cards?page=${nextPage}` : null; 
    return { status: 200, data: { cards, next } };
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

const update = async (id, user, { name, description, image, rarityId, attributes, deckId }) => {
  try {
    const [attributeOne, attributeTwo, attributeThree] = attributes;
    const deck = await Deck.findByPk(deckId);
    if (!deck) return { status: 404, data: { message: 'Deck not found' } };
    if (deck.userId !== user.id) {
      return { status: 401, data: { message: 'This deck do not belong to this user' } };
    }
    const card = await Card.findByPk(id);
    if (!card) return { status: 404, data: { message: 'Card not found' } };
    await Card.update(
      { name, description, image, rarityId, attributeOne, attributeTwo, attributeThree },
      { where: { id } },
    );
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

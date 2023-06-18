module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define(
    'Deck',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      attributeOne: DataTypes.STRING,
      attributeTwo: DataTypes.STRING,
      attributeThree: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      created: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'decks',
    },
  );

  Deck.associate = ({ User, Card }) => {
    Deck.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    Deck.hasMany(Card, { foreignKey: 'deckId', as: 'cards' });
  };

  return Deck;
};

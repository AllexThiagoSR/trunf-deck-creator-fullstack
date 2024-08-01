'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('decks',[
      {
        name: 'The Office',
        user_id: 1,
        attribute_one: 'Humor',
        attribute_two: 'Beauty',
        attribute_three: 'Craziness',
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('decks', null, {});
  }
};

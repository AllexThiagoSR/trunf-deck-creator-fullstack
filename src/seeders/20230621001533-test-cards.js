'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('cards', [
      {
        name: 'Test card 1',
        description: 'A card to test the API',
        image: 'Card Image',
        rarity_id: 1,
        is_trunfo: false,
        attribute_one: 10,
        attribute_two: 10,
        attribute_three: 10,
        deck_id: 1
      },
      {
        name: 'Test card 2',
        description: 'Another card to test the API',
        image: 'Card Image',
        rarity_id: 3,
        is_trunfo: true,
        attribute_one: 10,
        attribute_two: 10,
        attribute_three: 10,
        deck_id: 1
      },
      {
        name: 'Test card 3',
        description: 'A card to test the API',
        image: 'Card Image',
        rarity_id: 1,
        is_trunfo: false,
        attribute_one: 10,
        attribute_two: 10,
        attribute_three: 10,
        deck_id: 1
      },
      {
        name: 'Test card 4',
        description: 'A card to test the API',
        image: 'Card Image',
        rarity_id: 1,
        is_trunfo: false,
        attribute_one: 10,
        attribute_two: 10,
        attribute_three: 10,
        deck_id: 1
      },
      {
        name: 'Test card 5',
        description: 'Another card to test the API',
        image: 'Card Image',
        rarity_id: 3,
        is_trunfo: false,
        attribute_one: 10,
        attribute_two: 10,
        attribute_three: 10,
        deck_id: 1
      },
      {
        name: 'Test card 6',
        description: 'A card to test the API',
        image: 'Card Image',
        rarity_id: 1,
        is_trunfo: false,
        attribute_one: 10,
        attribute_two: 10,
        attribute_three: 10,
        deck_id: 1
      },
      {
        "name": "Michael Scott",
        "description": "Regional manager of the Scranton, Pensylvania branch of Dunder Mifflin.",
        "image": "https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png?20111015043011",
        "rarity_id": 5,
        "is_trunfo": true,
        "deck_id": 5,
        "attribute_one": 90,
        "attribute_two": 30,
        "attribute_three": 90
      },
      {
        "name": "Pam Beesly",
        "description": "Initially a shy receptionist at Dunder Mifflin, where Michael Scott is the manager.",
        "image": "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Pam_Beesley.jpg/220px-Pam_Beesley.jpg",
        "rarity_id": 5,
        "is_trunfo": false,
        "deck_id": 5,
        "attribute_one": 60,
        "attribute_two": 90,
        "attribute_three": 60
      },
      {
        "name": "Jim Halpert",
        "description": "Salesman at Dunder Mifflin, where Michael Scott is the manager. Loves to play pranks.",
        "image": "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Jim-halpert.jpg/220px-Jim-halpert.jpg",
        "rarity_id": 5,
        "is_trunfo": false,
        "deck_id": 5,
        "attribute_one": 90,
        "attribute_two": 50,
        "attribute_three": 70
      },
      {
        "name": "Dwight Schrute",
        "description": "Salesman and the assistant to the regional manager at Dunder Mifflin, where Michael Scott is the manager. He's totally crazy.",
        "image": "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Dwight_Schrute.jpg/220px-Dwight_Schrute.jpg",
        "rarity_id": 5,
        "is_trunfo": false,
        "deck_id": 5,
        "attribute_one": 30,
        "attribute_two": 30,
        "attribute_three": 90
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cards', null, {});
  }
};

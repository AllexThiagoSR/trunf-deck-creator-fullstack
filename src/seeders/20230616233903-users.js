'use strict';

const { encryptPassword } = require("../utils/bcryptUtils");

const { ADM_PASSWORD } = process.env;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'Allek',
          email: 'allexthiagoDEV@gmail.com',
          password: encryptPassword(ADM_PASSWORD),
          role_id: 1
        }
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};

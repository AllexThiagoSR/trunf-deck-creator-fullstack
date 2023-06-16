
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'users',
      { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        role: {
          type: Sequelize.INTEGER,
          allowNull: false,
          referenses: {
            key: 'id',
            model: 'roles',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};

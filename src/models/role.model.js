module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      underscored: true,
      tableName: 'roles',
      timestamps: false,
    }
  );

  Role.associate = ({ User }) => {
    Role.belongsToMany(User, { foreignKey: 'role', as: 'users' });
  };

  return Role;
};

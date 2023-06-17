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
    Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });
  };

  return Role;
};

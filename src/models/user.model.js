module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      role: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      uderscored: true,
      timestamps: false,
      tableName: 'users',
    }
  );

  User.associate = ({ Role }) => {
    User.hasOne(
      Role,
      {
        foreignKey: 'role',
        as: 'role'
      }
    );
  };

  return User;
};

const bcrypt = require('bcrypt');

const encryptPassword = (password) => {
  const encrypted = bcrypt.hashSync(password, 10);
  return encrypted;
};

const isRightPassword = (password, storedPassword) => bcrypt.compareSync(password, storedPassword);

module.exports = { encryptPassword, isRightPassword };

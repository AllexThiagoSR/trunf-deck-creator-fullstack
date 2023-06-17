const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtconfig = {
  expiresIn: '3d',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, jwtconfig);
  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};

module.exports = { createToken, verifyToken };

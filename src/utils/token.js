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
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { data: decoded };
  } catch (error) {
    if (error.message.includes('provided')) {
      return { status: 401, data: { message: 'Token not found' } };
    }
    if (error.message.includes('invalid')) { 
      return { status: 401, data: { message: 'Invalid token' } }; 
    }
    return { status: 500, data: { message: 'Internal server error' } }; 
  }
};

module.exports = { createToken, verifyToken };

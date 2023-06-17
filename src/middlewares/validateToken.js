const { verifyToken } = require('../utils/token');

module.exports = async (req, res, next) => {
  const { status, data } = verifyToken(req.headers.authorization);
  if (status) return res.status(status).json(data);
  req.user = data;
  return next();
};

const { createUserSchema } = require('./schemas');

module.exports = async (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  return next();
};
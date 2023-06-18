const { createDeckSchema } = require('./schemas');

module.exports = async (req, res, next) => {
  const { name, attributeOne, attributeTwo, attributeThree } = req.body;
  const { error } = createDeckSchema.validate({ name, attributeOne, attributeTwo, attributeThree });
  if (error) return res.status(400).json({ message: error.message });
  return next();
};

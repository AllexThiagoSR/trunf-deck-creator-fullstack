const validateLogin = async (req, res, next) => {
  const { username, email, password } = req.body;
  if ((!username && !email) || !password) {
    return res.status(400).json({ message: 'Some required field are missing' }); 
  }
  return next();
};

module.exports = validateLogin;

const { Router } = require('express');
const { userController } = require('../controllers');
const validateNewUser = require('../middlewares/validateNewUser');

const router = Router();

router.post('/', validateNewUser, userController.create);

module.exports = router;

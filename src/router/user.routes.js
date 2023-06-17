const { Router } = require('express');
const { userController } = require('../controllers');
const validateNewUser = require('../middlewares/validateNewUser');
const validateToken = require('../middlewares/validateToken');

const router = Router();

router.post('/', validateNewUser, userController.create);

router.get('/', validateToken, userController.getAll);

router.get('/:id', validateToken, userController.getUserById);

module.exports = router;

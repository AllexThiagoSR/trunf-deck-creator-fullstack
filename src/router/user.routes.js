const { Router } = require('express');
const { userController } = require('../controllers');
const validateNewUser = require('../middlewares/validateNewUser');
const validateToken = require('../middlewares/validateToken');

const router = Router();

router.post('/', validateNewUser, userController.create);

router.get('/', validateToken, userController.getAll);

router.get('/:id', validateToken, userController.getUserById);

router.patch('/change/password', validateToken, userController.changePassword);

router.put('/update', validateToken, userController.updateUser);

module.exports = router;

const { Router } = require('express');
const { cardController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');
const validateCardUpdate = require('../middlewares/validateCardUpdate');

const router = Router();

router.get('/', validateToken, cardController.getAll);

router.post('/', validateToken, cardController.create);

router.put('/:id', validateToken, validateCardUpdate, cardController.update);

module.exports = router;

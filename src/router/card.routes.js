const { Router } = require('express');
const { cardController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const router = Router();

router.get('/', validateToken, cardController.getAll);

module.exports = router;

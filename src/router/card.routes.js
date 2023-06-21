const { Router } = require('express');
const { cardController } = require('../controllers');

const router = Router();

router.get('/', cardController.getAll);

module.exports = router;

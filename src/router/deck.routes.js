const { Router } = require('express');
const { deckController } = require('../controllers');

const router = Router();

router.post('/', deckController.create);

module.exports = router;

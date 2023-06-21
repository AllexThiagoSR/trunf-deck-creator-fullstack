const { Router } = require('express');
const { deckController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');
const validateNewDeck = require('../middlewares/validateNewDeck');

const router = Router();

router.post('/', validateToken, validateNewDeck, deckController.create);

router.get('/', validateToken, deckController.getAll);

router.get('/:id', deckController.getById);

module.exports = router;

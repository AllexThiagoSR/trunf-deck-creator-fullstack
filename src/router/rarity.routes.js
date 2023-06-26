const { Router } = require('express');
const { rarityController } = require('../controllers');

const router = Router();

router.get('/', rarityController.getAll);

module.exports = router;

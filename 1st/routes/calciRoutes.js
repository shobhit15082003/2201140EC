const express = require('express');
const router = express.Router();
const controller = require('../controllers/calciControllers');

router.get('/:type', controller.getNums);

module.exports = router;

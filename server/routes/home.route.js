const { getHome, addToHome } = require('../controllers/home.controller.js');
const express = require('express');
const router = express.Router();



router.get('/', getHome);
router.post('/', addToHome);


module.exports = router;
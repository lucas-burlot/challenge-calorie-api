const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Login and get JWT token
router.post('/login', userController.login);
// Register (username, password)
router.post('/register', userController.register);

module.exports = router;

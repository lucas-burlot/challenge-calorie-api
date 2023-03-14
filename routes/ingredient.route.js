const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredient.controller');

// Login and get JWT token
router.get('/ingredients', ingredientController.getAllIngredient);

module.exports = router;

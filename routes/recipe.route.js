const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');
const authMiddleware = require("../middleware/authMiddleware");

// Routes protégées par le middleware
router.use(authMiddleware);
// Get all recipes
router.get('/recipes', recipeController.getAllRecipes);
// Get recipe by ID
router.get('/recipes/:id', recipeController.getRecipeById);
// Create recipe
router.post('/recipes', recipeController.createRecipe);
// Update recipe
router.put('/recipes/:id', recipeController.updateRecipe);
// Delete recipe
router.delete('/recipes/:id', recipeController.deleteRecipeById);
// Analyze recipe
router.get('/recipes/:id/analyse', recipeController.analyse);

module.exports = router;

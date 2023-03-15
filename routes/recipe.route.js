const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');
const authMiddleware = require("../middleware/authMiddleware");

// Routes protégées par le middleware
router.use(authMiddleware);

/**
 * @api {get} /recipes Get all recipes
 * @apiName GetAllRecipes
 * @apiGroup Recipe
 * @apiDescription Retrieves all recipes from the database.
 *
 * @apiHeader {String} Authorization Bearer token required.
 *
 * @apiSuccess {String} userRecipes Recipes list of the user.
 *
 * @apiSuccessExample {json} Success Response:
 *  HTTP/1.1 200 OK
 *  "userRecipes" :
 *   [
 *         {
 *             "id": "2b00a5a-002f-2752-03c1-0a77f1c41c2e",
 *             "user_id": "1b04a5a0-002f-4752-00c2-0y77f1c11c2e",
 *             "id": 1,
 *             "name": "Chocolate Cake",
 *             "description": "A delicious chocolate cake recipe",
 *             "ingredients": [
 *                 {
 *                     "id": 1,
 *                     "quantity": 500
 *                 },
 *                 {
 *                     "id": 2,
 *                     "quantity": 250
 *                 }
 *             ],
 *             "instructions": [
 *                 "Preheat oven to 350 degrees F (175 degrees C).",
 *                 "Grease and flour three 9-inch cake pans.",
 *                 "Frost and decorate the cake as desired."
 *             ]
 *         },
 *         {
 *             "id": "1b00a5a0-002f-4752-00c1-0a77f1c41c2e",
 *             "user_id": "1b00a5a0-002f-4752-00c2-0a77f1c11c2e",
 *             "name": "Chocolate Cake 2",
 *             "description": "A delicious chocolate cake recipe",
 *             "ingredients": [
 *                 {
 *                     "id": 1,
 *                     "quantity": 500
 *                 },
 *                 {
 *                     "id": 2,
 *                     "quantity": 250
 *                 }
 *             ],
 *             "instructions": [
 *                 "Preheat oven to 350 degrees F (175 degrees C).",
 *                 "Grease and flour three 9-inch cake pans.",
 *                 "Frost and decorate the cake as desired."
 *             ]
 *         }
 *      ]
 *
 *  @apiError {String} message Error message.
 *  @apiErrorExample {json} Error Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *         "message": "Invalid authorization token."
 *     }
 */
router.get('/recipes', recipeController.getAllRecipes);
// random recipe
router.get('/recipes/random', recipeController.randomRecipe);
// Get recipe by ID
router.get('/recipes/:id', recipeController.getRecipeById);
// Create recipe
router.post('/recipes', recipeController.createRecipe);
// Update recipe
router.put('/recipes/:id', recipeController.updateRecipe);
// Delete recipe
router.delete('/recipes/:id', recipeController.deleteRecipeById);
// Analyze recipe
router.get('/recipes/:id/analyse', recipeController.analyseRecipe);

module.exports = router;

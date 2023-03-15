const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');
const authMiddleware = require("../middleware/authMiddleware");

// Routes protégées par le middleware
router.use(authMiddleware);

/**
 * @api {get} /recipes Get all recipes
 * @apiName GetAllRecipes
 * @apiGroup Recipes
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
 *  @apiErrorExample {json} Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     {
 *         "message": "Invalid authorization token."
 *     }
 */
router.get('/recipes', recipeController.getAllRecipes);

/**
 * @api {get} /recipes/random Random Recipe
 * @apiName RandomRecipe
 * @apiGroup Recipes
 *
 * @apiHeader {String} Authorization Bearer token required.
 *
 * @apiSuccessExample {json} Success Response:
 *  HTTP/1.1 200 OK
 *         {
 *             "id": "2b00a5a-002f-2752-03c1-0a77f1c41c2e",
 *             "user_id": "1b04a5a0-002f-4752-00c2-0y77f1c11c2e",
 *             "id": 1,
 *             "name": "Chocolate Cake random",
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
 *
 * @apiError {String} message Error message.
 *
 * @apiErrorExample {json} Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 */
router.get('/recipes/random', recipeController.randomRecipe);

/**
 * @api {get} /recipes/:id Get recipe by ID
 * @apiName GetRecipeById
 * @apiGroup Recipes
 *
 * @apiHeader {String} Authorization Bearer token required.
 *
 * @apiParam {String} id ID of the recipe to retrieve.
 *
 * @apiSuccess {String} recipe Return the recipe object.
 *
 * @apiSuccessExample {json} Success Response:
 *  HTTP/1.1 200 OK
 *  "recipe" :
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
 *         }
 *
 * @apiError {String} message Error message.
 *
 * @apiErrorExample {json} Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 */
router.get('/recipes/:id', recipeController.getRecipeById);

/**
 * @api {post} /recipes Create recipe
 * @apiName CreateRecipe
 * @apiGroup Recipes
 *
 * @apiHeader {String} Authorization Bearer token required.
 *
 * @apiParam {String} name Name of the recipe.
 * @apiParam {String} description Description of the recipe.
 * @apiParam {Object[]} ingredients Ingredients of the recipe.
 * @apiParam {String} ingredients.id ID of the ingredient.
 * @apiParam {Number} ingredients.quantity Quantity of the ingredient.
 * @apiParam {String[]} instructions Directions for cooking the recipe.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Recipe created"
 *     }
 *
 * @apiErrorExample Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample body parameters required
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "name, description, steps, ingredients are required"
 *     }
 *
 * @apiErrorExample Already exists (by name)
 *     HTTP/1.1 400 Unauthorized
 *     {
 *       "error": "Recipe already exists"
 *     }
 */
router.post('/recipes', recipeController.createRecipe);

/**
 * @api {put} /recipes/:id Update recipe
 * @apiName UpdateRecipe
 * @apiGroup Recipes
 *
 * @apiHeader {String} Authorization Bearer token required.
 *
 * @apiParam {String} id ID of the recipe to update.
 * @apiParam {String} name Name of the recipe.
 * @apiParam {String} description Description of the recipe.
 * @apiParam {Object[]} ingredients Ingredients of the recipe.
 * @apiParam {String} ingredients.id ID of the ingredient.
 * @apiParam {Number} ingredients.quantity Quantity of the ingredient.
 * @apiParam {String[]} instructions Directions for cooking the recipe.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Recipe updated"
 *     }
 *
 * @apiErrorExample Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample Id required
 *     HTTP/1.1 400 Unauthorized
 *     {
 *       "error": "Recipe id is required"
 *     }
 *
 * @apiErrorExample body parameters required
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "name, description, steps, ingredients are required"
 *     }
 *
 * @apiErrorExample Already exists (by name)
 *     HTTP/1.1 400 Unauthorized
 *     {
 *       "error": "Recipe already exists"
 *     }
 */
router.put('/recipes/:id', recipeController.updateRecipe);

/**
 * @api {delete} /recipes/:id Delete recipe
 * @apiName DeleteRecipe
 * @apiGroup Recipes
 *
 * @apiHeader {String} Authorization Bearer token required.
 *
 * @apiParam {String} id ID of the recipe to delete.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "message": "Recipe deleted"
 *     }
 *
 * @apiErrorExample Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample ID required
 *     HTTP/1.1 400 Unauthorized
 *     {
 *       "error": "Recipe id is required"
 *     }
 */
router.delete('/recipes/:id', recipeController.deleteRecipeById);

/**
 * @api {get} /recipes/:id/analyse Analyze recipe
 * @apiName AnalyzeRecipe
 * @apiGroup Recipes
 *
 * @apiHeader {String} Authorization Bearer token required.
 *
 * @apiParam {String} id ID of the recipe to analyze.
 *
 * @apiSuccess {String} message A success message.
 * @apiSuccess {Number} total_calories Total calories of the recipe.
 * @apiSuccess {Number} total_proteins Total proteins of the recipe.
 * @apiSuccess {Number} total_carbohydrates Total carbohydrates of the recipe.
 * @apiSuccess {Number} total_lipids Total lipids of the recipe.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Success",
 *        "total_calories": 535.6,
 *        "total_proteins": 39.992,
 *        "total_carbohydrates": 68.366,
 *        "total_lipids": 12.620999999999999
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 */
router.get('/recipes/:id/analyse', recipeController.analyseRecipe);

module.exports = router;

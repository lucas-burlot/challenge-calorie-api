const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredient.controller');


/**
 * @api {get} /ingredients Get all ingredients
 * @apiName GetAllIngredients
 * @apiGroup Ingredient
 * @apiDescription Retrieves all ingredients from the database.
 *
 * @apiHeader {String} Authorization Bearer token required.
 *
 * @apiSuccess {String} ingredients Ingredients list.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     "ingredients" : [
 *         {
 *             "id": 1,
 *             "name": "Chicken",
 *             "quantity": 100,
 *             "unit": "g"
 *             "calories": 100,
 *             "carbohydrates": 100,
 *             "proteins": 100,
 *             "lipids": 100
 *         },
 *         {
 *             "id": 2,
 *             "name": "Avocado",
 *             "quantity": 250,
 *             "unit": "g"
 *             "calories": 100,
 *             "carbohydrates": 100,
 *             "proteins": 100,
 *             "lipids": 100
 *         }
 *     ]
 * @apiError {String} message Error message.
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *         "message": "Invalid authorization token."
 *     }
 */
router.get('/ingredients', ingredientController.getAllIngredient);

module.exports = router;

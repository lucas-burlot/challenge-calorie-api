// controllers/ingredientController.js
const Ingredient = require('../models/ingredient.model.js');
const http_status = require('../http-status-codes.js');
async function getAllIngredient(req, res) {
    try {
        const ingredients = Ingredient.find();
        res.status(http_status.global_status.SUCCESS.status).json({ ingredients });
    } catch (error) {
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({ message: http_status.global_status.SERVER_ERROR.message });
    }
}

module.exports = { getAllIngredient }

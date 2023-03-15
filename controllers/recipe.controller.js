// controllers/recipeController.js
const Recipe = require('../models/recipe.model');
const Ingredient = require('../models/ingredient.model');
const http_status = require('../http-status-codes.js');
const faker = require('@faker-js/faker');
const {v4: uuidv4} = require("uuid");

async function createRecipe(req, res) {
    try {
        const {name, description, steps, ingredients} = req.body;
        if (!name || !description || !steps || !ingredients) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({message: http_status.general_messages.RECIPE_FIELDS_REQUIRED});
        }

        const recipeExist = Recipe.find({name: name, user_id: req.user.id});
        if (recipeExist.length > 0) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({message: http_status.general_messages.RECIPE_ALREADY_EXIST});
        }
        // get user_id from token
        const user_id = req.user.id;
        const recipe = new Recipe(user_id, name, description, steps, ingredients);
        Recipe.create(recipe);
        res.status(http_status.global_status.CREATED.status).json({message: http_status.general_messages.RECIPE_CREATED});
    } catch (error) {
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({message: http_status.global_status.SERVER_ERROR.message});
    }
}

async function getRecipeById(req, res) {
    try {
        if (!req.params.id) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({message: http_status.general_messages.RECIPE_ID_REQUIRED});
        }
        const recipe = Recipe.find({id: req.params.id})[0];
        if (!recipe) {
            return res.status(http_status.global_status.NOT_FOUND.status).json({message: http_status.general_messages.RECIPE_NOT_FOUND});
        }
        if(recipe.user_id !== req.user.id) {
            return res.status(http_status.global_status.UNAUTHORIZED.status).json({message: http_status.global_status.UNAUTHORIZED.message});
        }
        res.status(http_status.global_status.SUCCESS.status).json({recipe});
    } catch (error) {
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({message: http_status.global_status.SERVER_ERROR.message});
    }
}

async function deleteRecipeById(req, res) {
    try {
        if (!req.params.id) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({message: http_status.general_messages.RECIPE_ID_REQUIRED});
        }
        const recipe = Recipe.find({id: req.params.id})[0];
        if (!recipe) {
            return res.status(http_status.global_status.NOT_FOUND.status).json({message: http_status.general_messages.RECIPE_NOT_FOUND});
        }
        if(recipe.user_id !== req.user.id) {
            return res.status(http_status.global_status.UNAUTHORIZED.status).json({message: http_status.global_status.UNAUTHORIZED.message});
        }
        Recipe.delete(recipe.id);
        res.status(http_status.global_status.SUCCESS.status).json({message: http_status.general_messages.RECIPE_DELETED});
    } catch (error) {
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({message: http_status.global_status.SERVER_ERROR.message});
    }
}

async function getAllRecipes(req, res) {
    try {
        const recipes = Recipe.find();
        const userRecipes = recipes.filter(recipe => recipe.user_id === req.user.id);
        res.status(http_status.global_status.SUCCESS.status).json({userRecipes});
    } catch (error) {
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({message: http_status.global_status.SERVER_ERROR.message});
    }
}

async function updateRecipe(req, res){
    try{
        if (!req.params.id) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({message: http_status.general_messages.RECIPE_ID_REQUIRED});
        }
        const { name, description, steps, ingredients } = req.body;
        if(!name || !description || !steps || !ingredients){
            return res.status(http_status.global_status.BAD_REQUEST.status).json({ message: http_status.general_messages.RECIPE_FIELDS_REQUIRED });
        }
        const recipe = Recipe.find({ id: req.params.id })[0];
        const recipeExist = Recipe.find({ name });
        if (recipeExist.length > 0 && recipeExist[0].id !== recipe.id) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({ message: http_status.general_messages.RECIPE_ALREADY_EXIST});
        }
        if(!recipe){
            return res.status(http_status.global_status.NOT_FOUND.status).json({ message: http_status.general_messages.RECIPE_NOT_FOUND });
        }
        if(recipe.user_id !== req.user.id) {
            return res.status(http_status.global_status.UNAUTHORIZED.status).json({message: http_status.global_status.UNAUTHORIZED.message});
        }
        Recipe.update(recipe.id, { name, description, steps, ingredients });
        res.status(http_status.global_status.SUCCESS.status).json({ message: http_status.general_messages.RECIPE_UPDATED });
    }catch(error){
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({ message: http_status.global_status.SERVER_ERROR.message });
    }
}

async function analyseRecipe(req, res){
    try{
        if (!req.params.id) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({message: http_status.general_messages.RECIPE_ID_REQUIRED});
        }
        const recipe = Recipe.find({ id: req.params.id })[0];
        if (!recipe) {
            return res.status(http_status.global_status.NOT_FOUND.status).json({ message: http_status.general_messages.RECIPE_NOT_FOUND });
        }
        if(recipe.user_id !== req.user.id) {
            return res.status(http_status.global_status.UNAUTHORIZED.status).json({message: http_status.global_status.UNAUTHORIZED.message});
        }
        const { ingredients } = recipe;
        const ingredientsList = Ingredient.find();
        let [totalCalories, totalProteins, totalCarbohydrates, totalLipids] = [0, 0, 0, 0];
        for(const recipe_ingredient of ingredients) {
            const ingredient = ingredientsList.find(ingredient => ingredient.id === recipe_ingredient.id);
            if(ingredient){
                totalCalories += (recipe_ingredient.quantity * ingredient.calories) / 100;
                totalProteins += (recipe_ingredient.quantity * ingredient.proteins) / 100;
                totalCarbohydrates += (recipe_ingredient.quantity * ingredient.carbohydrates) / 100;
                totalLipids += (recipe_ingredient.quantity * ingredient.lipids) / 100;
            }
        }
        res.status(http_status.global_status.SUCCESS.status).json(
            {
                message: http_status.global_status.SUCCESS.message,
                total_calories: totalCalories, total_proteins: totalProteins,
                total_carbohydrates: totalCarbohydrates, total_lipids: totalLipids
            }
        );
    }catch (error) {
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({ message: http_status.global_status.SERVER_ERROR.message });
    }
}

// create a random recipe
async function randomRecipe(req, res){
    try{
        const ingredients = Ingredient.find();
        const randomIngredients = [];
        const randomNumberOfIngredients = Math.floor(Math.random() * ingredients.length) + 1;
        for(let i = 0; i < randomNumberOfIngredients; i++){
            const randomIndex = Math.floor(Math.random() * ingredients.length);
            randomIngredients.push(ingredients[randomIndex]);
        }
        const randomRecipe = {
            id: uuidv4(),
            user_id: req.user.id,
            name: faker.faker.lorem.word() + " " + faker.faker.lorem.word(),
            description: faker.faker.lorem.paragraph(),
            steps: [faker.faker.lorem.paragraph(), faker.faker.lorem.paragraph(), faker.faker.lorem.paragraph()],
            ingredients: randomIngredients.map(ingredient => {
                return {
                    id: ingredient.id,
                    quantity: Math.floor(Math.random() * 100)
                }
            })
        }
        Recipe.create(randomRecipe);
        res.status(http_status.global_status.SUCCESS.status).json(randomRecipe);
    }catch (error) {
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({ message: http_status.global_status.SERVER_ERROR.message });
    }
}

module.exports = { createRecipe, getRecipeById, deleteRecipeById, getAllRecipes, updateRecipe, analyseRecipe, randomRecipe }


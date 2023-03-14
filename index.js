const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const http_status = require('./http-status-codes.js');
const { v4: uuidv4 } = require('uuid');

// Global variables
require('dotenv').config();
const authMiddleware = require('./middleware/authMiddleware');
const Database = require('./database');
const app = express();

// Database
const db_ingredients = new Database('database/ingredients.json');
const db_users = new Database('database/users.json');
const db_recipes = new Database('database/recipes.json');

// Load data from file
db_ingredients.load();
db_users.load();
db_recipes.load();

// load body parser
app.use(bodyParser.json());

// Register a new user
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({ error: http_status.general_messages.USERNAME_PASSWORD_REQUIRED });
        }
        const userNameExist = db_users.find({ username: username });
        if (userNameExist.length > 0) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({ error: http_status.general_messages.USERNAME_ALREADY_EXIST});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { id: uuidv4(), username, password: hashedPassword };
        db_users.create(user);
        res.status(http_status.global_status.CREATED.status).json({ message: http_status.general_messages.USER_CREATED });
    } catch (error) {
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({ error: http_status.global_status.SERVER_ERROR.message });
    }
});

// Log in a user
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({ error: http_status.general_messages.USERNAME_PASSWORD_REQUIRED });
        }
        const user = db_users.find({ username })[0];
        if (!user) {
            return res.status(http_status.global_status.NOT_FOUND.status).json({ error: http_status.general_messages.USER_NOT_FOUND });
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({ error: http_status.general_messages.INVALID_CREDENTIALS });
        }
        const token = jwt.sign({ username }, process.env.SECRET_JWT_SEED);
        res.status(http_status.global_status.SUCCESS.status).json({ token: token });
    } catch (error) {
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({ error: http_status.global_status.SERVER_ERROR.message });
    }
});

// Creation d'une recette
app.post('/recipe', authMiddleware, async (req, res) => {
    try{
        const { name, description, steps, ingredients } = req.body;
        if(!name || !description || !steps || !ingredients){
            return res.status(http_status.global_status.BAD_REQUEST.status).json({ error: http_status.general_messages.RECIPE_FIELDS_REQUIRED });
        }

        const recipeExist = db_recipes.find({ name });
        if (recipeExist.length > 0) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({ error: http_status.general_messages.RECIPE_ALREADY_EXIST});
        }
        const recipe = { id: uuidv4(), name, description, steps, ingredients };
        db_recipes.create(recipe);
        res.status(http_status.global_status.CREATED.status).json({ message: http_status.general_messages.RECIPE_CREATED });
    } catch (error) {
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({ error: http_status.global_status.SERVER_ERROR.message });
    }

});

// Récupération d'une recette par ID
app.get('/recipe/:id', authMiddleware, async (req, res) => {
    try{
        verifyParamId(req, res);
        const recipe = db_recipes.find({ id: req.params.id })[0];
        if (!recipe) {
            return res.status(http_status.global_status.NOT_FOUND.status).json({ error: http_status.general_messages.RECIPE_NOT_FOUND });
        }
        res.status(http_status.global_status.SUCCESS.status).json({ recipe });
    }catch (error) {
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({ error: http_status.global_status.SERVER_ERROR.message });
    }
});

// Suppression d'une recette par ID
app.delete('/recipe/:id', authMiddleware, async (req, res) => {
    try{
        verifyParamId(req, res);
        const recipe = db_recipes.find({ id: req.params.id })[0];
        if (!recipe) {
            return res.status(http_status.global_status.NOT_FOUND.status).json({ error: http_status.general_messages.RECIPE_NOT_FOUND });
        }
        db_recipes.delete(recipe.id);
        res.status(http_status.global_status.SUCCESS.status).json({ message: http_status.general_messages.RECIPE_DELETED });
    }catch (error){
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({ error: http_status.global_status.SERVER_ERROR.message });
    }
});

// Récupération de toutes les recettes
app.get('/recipe', authMiddleware, async (req, res) => {
    try{
        const recipes = db_recipes.find();
        res.status(http_status.global_status.SUCCESS.status).json({ recipes });
    }catch (error){
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({ error: http_status.global_status.SERVER_ERROR.message });
    }
});

// Modification d'une recette par ID
app.put('/recipe/:id', authMiddleware, async (req, res) => {
    try{
        verifyParamId(req, res);
        const { name, description, steps, ingredients } = req.body;
        if(!name || !description || !steps || !ingredients){
            return res.status(http_status.global_status.BAD_REQUEST.status).json({ error: http_status.general_messages.RECIPE_FIELDS_REQUIRED });
        }
        const recipe = db_recipes.find({ id: req.params.id })[0];
        const recipeExist = db_recipes.find({ name });
        if (recipeExist.length > 0 && recipeExist[0].id !== recipe.id) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({ error: http_status.general_messages.RECIPE_ALREADY_EXIST});
        }
        if(!recipe){
            return res.status(http_status.global_status.NOT_FOUND.status).json({ error: http_status.general_messages.RECIPE_NOT_FOUND });
        }
        db_recipes.update(recipe.id, { name, description, steps, ingredients });
        res.status(http_status.global_status.SUCCESS.status).json({ message: http_status.general_messages.RECIPE_UPDATED });
    }catch(error){
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({ error: http_status.global_status.SERVER_ERROR.message });
    }
});

app.get('/recipe/:id/analyse', authMiddleware, async (req, res) => {
    verifyParamId(req, res);
    const recipe = db_recipes.find({ id: req.params.id })[0];
    if (!recipe) {
        return res.status(http_status.global_status.NOT_FOUND.status).json({ error: http_status.general_messages.RECIPE_NOT_FOUND });
    }
    const { ingredients } = recipe;
    const ingredientsList = db_ingredients.find();
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
});

const verifyParamId = (req, res) => {
    if(!req.params.id){
        return res.status(http_status.global_status.BAD_REQUEST.status).json({ error: http_status.general_messages.RECIPE_ID_REQUIRED });
    }
}

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});

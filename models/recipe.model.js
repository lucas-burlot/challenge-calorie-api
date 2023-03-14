// models/recipe.js
const Database = require("../database");
const {v4: uuidv4} = require("uuid");
const recipeDatabase = new Database("database/recipes.json");
class Recipe {
    constructor(user_id, name, description, steps, ingredients) {
        this.id = uuidv4();
        this.user_id = user_id;
        this.name = name;
        this.description = description;
        this.steps = steps;
        this.ingredients = ingredients;
    }
    static find(query) {
        return recipeDatabase.find(query);
    }

    static create(recipe) {
        recipeDatabase.create(recipe);
    }

    static update(recipe) {
        recipeDatabase.update(recipe.id, recipe);
    }

    static delete(id) {
        recipeDatabase.delete(id);
    }
}

recipeDatabase.load();

module.exports = Recipe;

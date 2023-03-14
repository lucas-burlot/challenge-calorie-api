// models/ingredient.js
const Database = require("../database");
const ingredientDatabase = new Database("database/ingredients.json");
const {v4: uuidv4} = require("uuid");
class Ingredient {
    constructor(name, unit, calories, carbohydrates, proteins, lipids) {
        this.id = uuidv4();
        this.name = name;
        this.unit = unit;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.proteins = proteins;
        this.lipids = lipids;
    }

    static find(query) {
        return ingredientDatabase.find(query);
    }

    static create(user) {
        ingredientDatabase.create(user);
    }

    static update(user) {
        ingredientDatabase.update(user.id, user);
    }

    static delete(id) {
        ingredientDatabase.delete(id);
    }
}

ingredientDatabase.load();
module.exports = Ingredient;

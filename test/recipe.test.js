const assert = require('assert');
const Recipe = require('../models/recipe.model');
const recipeDataExample = {
    user_id: '123456789',
    name: 'My Recipe',
    description: 'A tasty recipe',
    steps: 'Step 1, Step 2, Step 3',
    ingredients: [
        {
            id: 1,
            quantity: 2
        },
        {
            id: 2,
            quantity: 3
        }
    ]
};

//  Recipe model test
describe('Recipe model', () => {
    let createdRecipe;

    beforeEach(async () => {
        createdRecipe = new Recipe(recipeDataExample.user_id, recipeDataExample.name, recipeDataExample.description, recipeDataExample.steps, recipeDataExample.ingredients);
        Recipe.create(createdRecipe);
    });

    afterEach(async () => {
        Recipe.delete(createdRecipe.id);
    });

    it('Create a recipe and get recipe', async () => {
        // Check if recipe is saved in database
        const savedRecipe = Recipe.find({ id: createdRecipe.id })[0]

        // Vérifier l'éauivalent entre les deux recettes
        assert.deepStrictEqual(savedRecipe, createdRecipe);
        assert.strictEqual(createdRecipe.name, recipeDataExample.name);
        assert.strictEqual(createdRecipe.description, recipeDataExample.description);
        assert.strictEqual(createdRecipe.steps, recipeDataExample.steps);
        assert.deepStrictEqual(createdRecipe.ingredients, recipeDataExample.ingredients);
    });

    it('Update a recipe', async () => {
        // Update a recipe
        createdRecipe.name = 'My Recipe Updated';
        Recipe.update(createdRecipe);
        // Check if recipe is updated in database
        const savedRecipe = Recipe.find({ id: createdRecipe.id })[0]
        assert.strictEqual(savedRecipe.name, createdRecipe.name);
    });

    it('Delete a recipe', async () => {
        Recipe.delete(createdRecipe.id);
        // Check if recipe is deleted in database
        const savedRecipe = Recipe.find({ id: createdRecipe.id })[0]
        assert.strictEqual(savedRecipe, undefined);
    });

    it('Get all recipes', async () => {
        // Create multiple recipes
        const recipe1 = new Recipe(recipeDataExample.user_id, 'Recipe 1', 'Description 1', 'Steps 1', []);
        Recipe.create(recipe1);
        const recipe2 = new Recipe(recipeDataExample.user_id, 'Recipe 2', 'Description 2', 'Steps 2', []);
        Recipe.create(recipe2);

        // Retrieve all recipes
        const allRecipes = Recipe.find();

        // Verify that all created recipes are returned
        assert.strictEqual(allRecipes.length, 3); // 3 because the beforeEach creates one recipe
        assert.deepStrictEqual(allRecipes[1], recipe1);
        assert.deepStrictEqual(allRecipes[2], recipe2);
        // Supprimer les recettes créées
        Recipe.delete(recipe1.id);
        Recipe.delete(recipe2.id);
    });
});

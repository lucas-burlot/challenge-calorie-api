const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Global variables
require('dotenv').config();
const app = express();
const recipeRoute = require('./routes/recipe.route.js');
const userRoute = require('./routes/user.route.js');
const ingredientRoute = require('./routes/ingredient.route.js');
// load body parser
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(bodyParser.json());
app.use(userRoute);
app.use(recipeRoute);
app.use(ingredientRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

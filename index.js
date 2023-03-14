const express = require('express');
const bodyParser = require('body-parser');

// Global variables
require('dotenv').config();
const app = express();
const recipeRoute = require('./routes/recipe.route.js');
const userRoute = require('./routes/user.route.js');

// load body parser
app.use(bodyParser.json());
app.use(userRoute);
app.use(recipeRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

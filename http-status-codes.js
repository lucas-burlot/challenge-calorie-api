const global_status = {
    SUCCESS: {
        status: 200,
        message: 'Success'
    },
    CREATED: {
        status: 201,
        message: 'Created'
    },
    BAD_REQUEST: {
        status: 400,
        message: 'Bad request'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    FORBIDDEN: {
        status: 403,
        message: 'Forbidden'
    },
    NOT_FOUND: {
        status: 404,
        message: 'Not found'
    },
    SERVER_ERROR: {
        status: 500,
        message: 'Internal server error'
    }
}

const general_messages = {
    // REQUIRED
    USERNAME_PASSWORD_REQUIRED: 'Username and password are required',
    RECIPE_FIELDS_REQUIRED: 'name, description, steps, ingredients are required',
    RECIPE_ID_REQUIRED: 'Recipe id is required',
    // ALREADY_EXIST
    USERNAME_ALREADY_EXIST: 'Username already exist',
    RECIPE_ALREADY_EXIST: 'Recipe already exist',
    // CREATED
    USER_CREATED: 'User created',
    RECIPE_CREATED: 'Recipe created',
    // UPDATED
    RECIPE_UPDATED: 'Recipe updated',
    // DELETED
    RECIPE_DELETED: 'Recipe deleted',
    // NOT_FOUND
    AUTHORIZATION_NOT_FOUND: 'Authorization header not found',
    RECIPE_NOT_FOUND: 'Recipe not found',
    USER_NOT_FOUND: 'User not found',
    // INVALID
    INVALID_CREDENTIALS: 'Invalid credentials',
}

module.exports = { global_status, general_messages };

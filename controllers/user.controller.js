// controllers/userController.js
const User = require('../models/user.model.js');
const http_status = require('../http-status-codes.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
async function register(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({ message: http_status.general_messages.USERNAME_PASSWORD_REQUIRED });
        }
        const userNameExist = await User.find({ username: username });
        if (userNameExist.length > 0) {
            return res.status(http_status.global_status.BAD_REQUEST.status).json({ message: http_status.general_messages.USERNAME_ALREADY_EXIST});
        }
        const user = new User(username, password)
        User.create(user);
        res.status(http_status.global_status.CREATED.status).json({ message: http_status.general_messages.USER_CREATED });
    } catch (error) {
        console.error(error);
        res.status(http_status.global_status.SERVER_ERROR.status).json({ message: http_status.global_status.SERVER_ERROR.message });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(http_status.global_status.BAD_REQUEST.status)
                .json({ message: http_status.general_messages.USERNAME_PASSWORD_REQUIRED });
        }
        const user = User.find({ username })[0];
        if (!user) {
            return res
                .status(http_status.global_status.NOT_FOUND.status)
                .json({ message: http_status.general_messages.USER_NOT_FOUND });
        }
        const passwordMatches = bcrypt.compareSync(password, user.password);
        if (!passwordMatches) {
            return res
                .status(http_status.global_status.BAD_REQUEST.status)
                .json({ message: http_status.general_messages.INVALID_CREDENTIALS });
        }
        const token = jwt.sign({ id: user.id , username }, process.env.SECRET_JWT_SEED, { expiresIn: '1m' });
        res.status(http_status.global_status.SUCCESS.status).json({ message:http_status.global_status.SUCCESS.message, token: token });
    } catch (error) {
        console.error(error);
        res
            .status(http_status.global_status.SERVER_ERROR.status)
            .json({ message: http_status.global_status.SERVER_ERROR.message });
    }
}

module.exports = { register, login }

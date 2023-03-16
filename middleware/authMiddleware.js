const jwt = require('jsonwebtoken');
require('dotenv').config();
const http_status = require('../http-status-codes.js');

function authMiddleware(req, res, next) {
    // Vérifiez si l'en-tête Authorization est présent
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(http_status.global_status.UNAUTHORIZED.status).json({ error: http_status.general_messages.AUTHORIZATION_NOT_FOUND });
    }

    // Vérifiez si le jeton est un jeton JWT valide
    const token = authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(token, process.env.SECRET_JWT_SEED);
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') { // Vérifiez si le JWT a expiré
            return res.status(http_status.global_status.UNAUTHORIZED.status).json({ error: 'JWT expired' });
        }
        return res.status(http_status.global_status.UNAUTHORIZED.status).json({ error: http_status.global_status.UNAUTHORIZED.message });
    }
}

module.exports = authMiddleware;

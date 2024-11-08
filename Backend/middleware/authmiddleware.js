const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = require('../config'); 

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Please authenticate bearer.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        console.log(decoded);
        req.user_id = decoded.user_id; // Attach the user ID to the request
        console.log(req.user_id);
        console.log("Auth done")
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'Please authenticate.' });
    }
};

module.exports = authMiddleware;

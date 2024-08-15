const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.id);
        if (!user) throw new Error();
        
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};

module.exports = authMiddleware;

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // Limit each IP to 3 requests per windowMs
    message: 'Too many requests from this IP, please try again after a minute.'
});

module.exports = limiter;

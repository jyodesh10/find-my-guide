const dotenv = require("dotenv");

dotenv.config();


const config = {
    jwtSecret : process.env.JWT_SECRET,
    accessTokenSecret : process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET
};

module.exports = config;
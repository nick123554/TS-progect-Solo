require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwtConfig");
// - payload — данные внутри токена
// - process.env.ACCESS_TOKEN_SECRET — секретный ключ из .env
// - jwtConfig.access — настройки (например, expiresIn)
const generateTokens = (payload) => ({
  accessToken: jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    jwtConfig.access
  ),
  refreshToken: jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    jwtConfig.refresh
  ),
});

module.exports = generateTokens;

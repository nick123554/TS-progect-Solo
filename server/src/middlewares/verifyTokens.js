const jwt = require("jsonwebtoken");
require("dotenv").config();
const formatResponse = require("../utils/formatResponse");

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = user;

    return next();
  } catch (error) {
    console.log("Invalid access token", error);
    return res.status(403).json(formatResponse(403, "Forbidden"));
  }
};

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;

    return next();
  } catch (error) {
    console.log("Invalid refresh token", error);
    return res
      .clearCookie("refreshToken")
      .status(401)
      .json(formatResponse(401, "Unauthorized"));
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };

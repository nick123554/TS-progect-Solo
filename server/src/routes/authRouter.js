const authRouter = require("express").Router();
const AuthController = require("../controllers/AuthController");
const { verifyRefreshToken } = require("../middlewares/verifyTokens");

authRouter.post("/signUp", AuthController.signup);
authRouter.post("/signIn", AuthController.login);
authRouter.get("/logout", AuthController.logout);
authRouter.get(
  "/refreshTokens",
  verifyRefreshToken,
  AuthController.refreshTokens
);
authRouter.get("/users", AuthController.getAllUsers);
authRouter.put("/update/:id", AuthController.updateUser);
// authRouter.delete()

module.exports = authRouter;

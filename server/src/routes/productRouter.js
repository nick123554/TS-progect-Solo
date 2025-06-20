const express = require("express");
const ProductController = require("../controllers/ProductController");
const validateId = require("../middlewares/validateId");
const {
  verifyRefreshToken,
  verifyAccessToken,
} = require("../middlewares/verifyTokens");


const productRouter = express.Router();

productRouter.get("/", ProductController.getProducts);
productRouter.post("/", verifyAccessToken, ProductController.createProduct);
productRouter.get("/:id", validateId, ProductController.getProductById);
productRouter.put(
  "/:id",
  verifyAccessToken,
  validateId,
  ProductController.updateProduct
);
productRouter.delete(
  "/:id",
  verifyAccessToken,
  validateId,
  ProductController.deleteProduct
);

productRouter.get("/by-author/:authorId", ProductController.getByAuthor); 

module.exports = productRouter;

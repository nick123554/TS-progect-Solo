const ProductService = require("../services/ProductService");
const formatResponse = require("../utils/formatResponse");
const isInvalidId = require("../utils/isInvalidId");
const ProductValidator = require("../utils/ProductValidator");

class ProductController {
  static async getProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();

      if (products.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "Not Products found", []));
      }

      return res.status(200).json(formatResponse(200, "Success", products));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }

  static async createProduct(req, res) {
    const { title, phone } = req.body;
    const { id: authorId } = res.locals.user;

    const { isValid, error } = ProductValidator.validate({
      title,
      phone,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation failed", null, error));
    }

    try {
      const newProduct = await ProductService.addProduct({
        title,
        phone,
        authorId,
      });
      if (!newProduct) {
        return res.status(400).json(formatResponse(400, "Create failed"));
      }

      return res.status(201).json(formatResponse(201, "Success", newProduct));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }

  static async getProductById(req, res) {
    const { id } = res.locals;

    try {
      const oneProduct = await ProductService.getOneProduct(id);
      if (!oneProduct) {
        return res.status(400).json(formatResponse(400, "Product not found"));
      }

      return res.status(200).json(formatResponse(200, "Success", oneProduct));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }

  static async updateProduct(req, res) {
    console.log("res.locals", res.locals);
    try {
      const { id } = res.locals;

      const { id: authorId } = res.locals.user;

      const { title, phone } = req.body;

      const { isValid, error } = ProductValidator.validate({ title, phone });
      // console.log('------->', title, phone)
      if (!isValid) {
        return res
          .status(400)
          .json(formatResponse(400, "Validation failed", null, error));
      }

      const updatedProduct = await ProductService.editProduct(
        { title, phone },
        id,
        authorId
      );
      if (!updatedProduct) {
        return res.status(400).json(formatResponse(400, "Product not found"));
      }

      return res
        .status(200)
        .json(formatResponse(200, "Success", updatedProduct));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }
  static async deleteProduct(req, res) {
    const { id } = req.params;
    const user = res.locals.user;

    if (isInvalidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid Product ID"));
    }

    try {
      const product = await ProductService.delete(id, user.id);

      if (!product) {
        return res.status(404).json(formatResponse(404, "Product not found"));
      }

      return res
        .status(200)
        .json(formatResponse(200, "Product deleted successfully"));
    } catch (error) {
      if (error.message.includes("Unauthorized")) {
        return res
          .status(403)
          .json(
            formatResponse(
              403,
              "No rights to delete this Product",
              null,
              error.message
            )
          );
      }

      console.log(error);
      return res
        .status(500)
        .json(
          formatResponse(500, "Internal server error", null, error.message)
        );
    }
  }

  static async getByAuthor(req, res) {
    try {
      const { authorId } = req.params;
      const products = await ProductService.getProductsByAuthor(authorId);

      if (products.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "Not Products found", []));
      }

      return res.status(200).json(formatResponse(200, "Success", products));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }
}

module.exports = ProductController;

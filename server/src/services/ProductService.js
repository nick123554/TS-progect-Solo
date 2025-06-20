const { where } = require("sequelize");
const { Product } = require("../../db/models");

class ProductService {
  static async getAllProducts() {
    return await Product.findAll();
  }

  static async addProduct(data) {
    return await Product.create(data);
  }

  static async getOneProduct(id) {
    return await Product.findByPk(id);
  }

  static async editProduct(data, id, authorId) {
    const oneProduct = await ProductService.getOneProduct(id);

    if (oneProduct) {
      if (oneProduct.dataValues.authorId !== authorId) {
        throw new Error(
          "Unauthorized: Only the author can delete this Product"
        );
      }
      await oneProduct.update(data);
    }

    return oneProduct;
  }
  static async delete(id, authorId) {
    // console.log("Проверка0----------------->");

    const product = await ProductService.getOneProduct(id);

    if (product) {
      if (product.authorId !== authorId) {
        throw new Error(
          "Unauthorized: Only the author can delete this Product"
        );
      }

      await product.destroy();
    }

    return product;
  }

  static async getProductsByAuthor(authorId) {
    return await Product.findAll({
      where: { authorId },
    });
  }
}

module.exports = ProductService;

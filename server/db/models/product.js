'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
   
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'authorId' });
    }
  }
  Product.init({
    title: DataTypes.STRING,
    phone: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
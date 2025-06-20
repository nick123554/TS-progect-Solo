"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          title: "Компания Альфа",
          phone: "88005553535", // строка
          authorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Техно Сервис",
          phone: "84951234567",
          authorId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Бета Логистика",
          phone: "89261234567",
          authorId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};

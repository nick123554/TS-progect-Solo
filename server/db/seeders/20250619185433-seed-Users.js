'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        password: '$2a$10$X8L9W7yY2lz6JZqJQ1ZrEeKj7d9r8sT0uLkMn5v4n3b2c1vV0wXyG', // password123
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Мария Петрова',
        email: 'maria@example.com',
        password: '$2a$10$X8L9W7yY2lz6JZqJQ1ZrEeKj7d9r8sT0uLkMn5v4n3b2c1vV0wXyG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Алексей Сидоров',
        email: 'alex@example.com',
        password: '$2a$10$X8L9W7yY2lz6JZqJQ1ZrEeKj7d9r8sT0uLkMn5v4n3b2c1vV0wXyG',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

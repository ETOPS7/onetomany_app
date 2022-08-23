const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const admin = await bcrypt.hash('123', 10);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Admin',
          lastname: 'Test',
          email: '123@123',
          password: admin,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

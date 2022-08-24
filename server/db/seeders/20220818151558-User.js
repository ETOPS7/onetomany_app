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
        {
          name: 'Admin2',
          lastname: 'Test',
          email: '1232@1232',
          password: admin,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Admin3',
          lastname: 'Test',
          email: '1233@1233',
          password: admin,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Admin4',
          lastname: 'Test',
          email: '1234@1234',
          password: admin,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Admin5',
          lastname: 'Test',
          email: '1235@1235',
          password: admin,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Admin6',
          lastname: 'Test',
          email: '1236@1236',
          password: admin,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Admin7',
          lastname: 'Test',
          email: '1237@1237',
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

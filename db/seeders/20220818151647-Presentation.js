module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Presentations',
      [
        {
          user_id: 1,
          name: 'TestCloud',
          pincode: 1234,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Presentations', null, {});
  },
};

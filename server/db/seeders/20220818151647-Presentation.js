module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Presentations',
      [
        {
          user_id: 1,
          name: 'TestCloud1',
          pincode: 1234,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: 'TestCloud2',
          pincode: 1234,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: 'TestCloud3',
          pincode: 1234,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: 'TestCloud4',
          pincode: 1234,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: 'TestCloud5',
          pincode: 1234,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: 'TestCloud6',
          pincode: 1234,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: 'TestCloud7',
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

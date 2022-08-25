module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Presentations',
      [
        {
          user_id: 1,
          name: 'TestCloud1',
          pincode: 12345,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: 'TestCloud2',
          pincode: 12346,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: 'TestCloud3',
          pincode: 12347,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: 'TestCloud4',
          pincode: 12347,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: 'TestCloud5',
          pincode: 12348,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: 'TestCloud6',
          pincode: 12399,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: 'TestCloud7',
          pincode: 12999,
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

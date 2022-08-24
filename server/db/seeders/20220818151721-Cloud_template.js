/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Cloud_templates',
      [
        {
          present_id: 1,
          question: 'TestQuestion?',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          present_id: 2,
          question: 'TestQuestion?',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          present_id: 3,
          question: 'TestQuestion?',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          present_id: 4,
          question: 'TestQuestion?',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          present_id: 5,
          question: 'TestQuestion?',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          present_id: 6,
          question: 'TestQuestion?',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          present_id: 7,
          question: 'TestQuestion?',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cloud_templates', null, {});
  },
};

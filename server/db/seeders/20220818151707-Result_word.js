module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Result_words',
      [
        {
          present_id: 1,
          word: 'TestWord1',
          count: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          present_id: 1,
          word: 'TestWord2',
          count: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          present_id: 1,
          word: 'TestWord3',
          count: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Result_words', null, {});
  },
};

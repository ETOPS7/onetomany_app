module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Result_words', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      present_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Presentations',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      word: {
        type: Sequelize.STRING,
      },
      count: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Result_words');
  },
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cloud_templates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question: {
        type: Sequelize.TEXT,
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
      type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Type_templates',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Cloud_templates');
  },
};

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cloud_template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Presentation, Type_template }) {
      this.belongsTo(Presentation, { foreignKey: 'present_id' });
      this.belongsTo(Type_template, { foreignKey: 'type_id' });
    }
  }

  Cloud_template.init(
    {
      question: DataTypes.TEXT,
      present_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cloud_template',
    },
  );
  return Cloud_template;
};

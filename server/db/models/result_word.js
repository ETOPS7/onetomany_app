const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Result_word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Presentation }) {
      this.belongsTo(Presentation, { foreignKey: 'present_id' });
    }
  }
  Result_word.init(
    {
      present_id: DataTypes.INTEGER,
      word: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Result_word',
    },
  );
  return Result_word;
};

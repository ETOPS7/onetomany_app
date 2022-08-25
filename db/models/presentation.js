const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presentation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Cloud_template, Result_word }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasOne(Cloud_template, { foreignKey: 'present_id' });
      this.hasMany(Result_word, { foreignKey: 'present_id' });
    }
  }
  Presentation.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      pincode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Presentation',
    },
  );
  return Presentation;
};

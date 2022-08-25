const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cloud_template }) {
      this.hasMany(Cloud_template, { foreignKey: 'type_id' });
    }
  }
  Type_template.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Type_template',
    },
  );
  return Type_template;
};

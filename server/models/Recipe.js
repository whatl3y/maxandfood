import { DataTypes, sequelize } from '../sequelize'

const Recipe = sequelize.define(
  'recipe',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    accountId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'accounts',
        key: 'id',
      },
    },
    title: DataTypes.STRING,
    isLive: DataTypes.BOOLEAN,
    yieldServings: DataTypes.INTEGER,
    prepTime: DataTypes.FLOAT,
    prepTimeUnits: DataTypes.STRING,
    cookTime: DataTypes.FLOAT,
    cookTimeUnits: DataTypes.STRING,
  },
  {
    underscored: true,
  }
)

Recipe.associate = (models) => {
  Recipe.belongsTo(models.Account)
}

export default Recipe

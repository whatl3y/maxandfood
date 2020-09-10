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
    endpoint: DataTypes.STRING,
    isLive: DataTypes.BOOLEAN,
    yieldServings: DataTypes.INTEGER,
    prepTime: DataTypes.FLOAT,
    prepTimeUnits: DataTypes.STRING,
    cookTime: DataTypes.FLOAT,
    cookTimeUnits: DataTypes.STRING,
    backgroundImageName: DataTypes.STRING,
    narrative: DataTypes.TEXT,
  },
  {
    underscored: true,
  }
)

Recipe.associate = (models) => {
  Recipe.belongsTo(models.Account)
  Recipe.hasMany(models.RecipeDirection)
  Recipe.hasMany(models.RecipeImage)
  Recipe.hasMany(models.RecipeIngredient)
}

export default Recipe

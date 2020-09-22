import { DataTypes, Op, sequelize } from '../sequelize'
import { RecipeImage, RecipeDirection, RecipeIngredient, Tag, User } from './'

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
    createdBy: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'users',
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

Recipe.getFullRecipe = async (recipeId) => {
  return await Recipe.findOne({
    where: { id: recipeId },
    include: [
      {
        model: RecipeDirection,
      },
      {
        model: RecipeImage,
      },
      {
        model: RecipeIngredient,
      },
      {
        model: Tag,
        where: { isDeleted: { [Op.not]: true } },
      },
      {
        model: User,
      },
    ],
    order: [
      [{ model: RecipeDirection }, 'ordering', 'ASC'],
      [{ model: RecipeImage }, 'ordering', 'ASC'],
      [{ model: RecipeIngredient }, 'ordering', 'ASC'],
      sequelize.fn('lower', sequelize.col('tags.name')),
    ],
  })
}

Recipe.associate = (models) => {
  Recipe.belongsTo(models.Account)
  Recipe.belongsTo(models.User, { foreignKey: 'created_by' })
  Recipe.hasMany(models.RecipeDirection)
  Recipe.hasMany(models.RecipeImage)
  Recipe.hasMany(models.RecipeIngredient)
  Recipe.belongsToMany(models.Tag, { through: models.RecipeTag })
}

export default Recipe

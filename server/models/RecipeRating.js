import { DataTypes, Op, sequelize } from '../sequelize'

const RecipeRating = sequelize.define(
  'recipe_rating',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    recipeId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'recipes',
        key: 'id',
      },
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
  },
  {
    underscored: true,
  }
)

export default RecipeRating

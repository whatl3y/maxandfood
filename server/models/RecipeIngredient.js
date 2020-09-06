import { DataTypes, sequelize } from '../sequelize'

const RecipeIngredient = sequelize.define(
  'recipe_ingredient',
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
    quantity: DataTypes.FLOAT,
    measurement: DataTypes.STRING,
    description: DataTypes.STRING,
    raw: DataTypes.JSONB,
  },
  {
    underscored: true,
  }
)

RecipeIngredient.associate = (models) => {
  RecipeIngredient.belongsTo(models.Recipe)
}

export default RecipeIngredient

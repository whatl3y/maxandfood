import { DataTypes, sequelize } from '../sequelize'

const RecipeStep = sequelize.define(
  'recipe_step',
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
    description: DataTypes.TEXT,
    ordering: DataTypes.INTEGER,
  },
  {
    underscored: true,
  }
)

RecipeStep.associate = (models) => {
  RecipeStep.belongsTo(models.Recipe)
}

export default RecipeStep

import { DataTypes, sequelize } from '../sequelize'

const RecipeImage = sequelize.define(
  'recipe_image',
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
    imageName: { allowNull: false, type: DataTypes.STRING },
    ordering: DataTypes.INTEGER,
  },
  {
    underscored: true,
  }
)

RecipeImage.associate = (models) => {
  RecipeImage.belongsTo(models.Recipe)
}

export default RecipeImage

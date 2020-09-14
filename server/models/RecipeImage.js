import { DataTypes, Op, sequelize } from '../sequelize'

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
    imageNameOptimized: DataTypes.STRING,
    ordering: DataTypes.INTEGER,
  },
  {
    underscored: true,
  }
)

RecipeImage.syncWithRecipe = async (recipeId, images) => {
  // don't proceed to update id passed in info is not array
  if (!(images instanceof Array)) return

  const imgIds = await Promise.all(
    images.map(async (image, ind) => {
      let img
      if (image.id) {
        img = await RecipeImage.findOne({
          where: { recipeId, id: image.id },
        })
      } else {
        img = await RecipeImage.create({ recipeId, imageName: image.imageName })
      }

      img.imageName = image.imageName
      img.imageNameOptimized = image.imageNameOptimized
      img.ordering = ind + 1
      await img.save()

      return img.id
    })
  )

  const imagesToDelete = await RecipeImage.findAll({
    where: {
      recipeId,
      id: {
        [Op.notIn]: imgIds,
      },
    },
  })
  await Promise.all(imagesToDelete.map(async (img) => await img.destroy()))
}

RecipeImage.associate = (models) => {
  RecipeImage.belongsTo(models.Recipe)
}

export default RecipeImage

import { DataTypes, Op, sequelize } from '../sequelize'

const RecipeDirection = sequelize.define(
  'recipe_direction',
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

RecipeDirection.syncWithRecipe = async (recipeId, directions) => {
  // don't proceed to update id passed in info is not array
  if (!(directions instanceof Array)) return

  const dirIds = await Promise.all(
    directions.map(async (direction, ind) => {
      let dir
      if (direction.id) {
        dir = await RecipeDirection.findOne({
          where: { recipeId, id: direction.id },
        })
      } else {
        dir = await RecipeDirection.create({ recipeId })
      }

      dir.description = direction.description
      dir.ordering = ind + 1
      await dir.save()

      return dir.id
    })
  )

  const directionsToDelete = await RecipeDirection.findAll({
    where: {
      recipeId,
      id: {
        [Op.notIn]: dirIds,
      },
    },
  })
  await Promise.all(directionsToDelete.map(async (dir) => await dir.destroy()))
}

RecipeDirection.associate = (models) => {
  RecipeDirection.belongsTo(models.Recipe)
}

export default RecipeDirection

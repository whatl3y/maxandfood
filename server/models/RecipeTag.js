import { DataTypes, Op, sequelize } from '../sequelize'

const RecipeTag = sequelize.define(
  'recipe_tag',
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
    tagId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'tags',
        key: 'id',
      },
    },
  },
  {
    underscored: true,
  }
)

RecipeTag.syncWithRecipe = async (recipeId, tags) => {
  // don't proceed to update id passed in info is not array
  if (!(tags instanceof Array)) return

  const ids = await Promise.all(
    tags.map(async (tag) => {
      const rt = await RecipeTag.findOrCreate({
        where: { recipeId, tagId: tag.id },
      })
      return rt.id
    })
  )

  const instancesToDelete = await RecipeTag.findAll({
    where: {
      recipeId,
      id: {
        [Op.notIn]: ids,
      },
    },
  })
  await Promise.all(instancesToDelete.map(async (rt) => await rt.destroy()))
}

RecipeTag.associate = (models) => {
  RecipeTag.belongsTo(models.Recipe)
  RecipeTag.belongsTo(models.Tag)
}

export default RecipeTag

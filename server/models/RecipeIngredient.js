import { DataTypes, Op, sequelize } from '../sequelize'

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
    ordering: DataTypes.INTEGER,
    raw: DataTypes.JSONB,
  },
  {
    underscored: true,
  }
)

RecipeIngredient.syncWithRecipe = async (recipeId, ingredients) => {
  const ids = await Promise.all(
    ingredients.map(async (ingredient, ind) => {
      let ingre
      if (ingredient.id) {
        ingre = await RecipeIngredient.findOne({
          where: { recipeId, id: ingredient.id },
        })
      } else {
        ingre = await RecipeIngredient.create({ recipeId })
      }

      ingre.quantity = ingredient.quantity
      ingre.measurement = ingredient.measurement
      ingre.description = ingredient.description
      ingre.raw = ingredient.raw
      ingre.ordering = ind + 1
      await ingre.save()

      return ingre.id
    })
  )

  const instancesToDelete = await RecipeIngredient.findAll({
    where: {
      recipeId,
      id: {
        [Op.notIn]: ids,
      },
    },
  })
  await Promise.all(instancesToDelete.map(async (ing) => await ing.destroy()))
}

RecipeIngredient.associate = (models) => {
  RecipeIngredient.belongsTo(models.Recipe)
}

export default RecipeIngredient

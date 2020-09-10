import { sequelize } from '../../../../../sequelize'
import {
  Account,
  Recipe,
  RecipeDirection,
  RecipeImage,
  RecipeIngredient,
  User,
} from '../../../../../models'

export default {
  async all({ req, res }) {
    const { account } = await User.getCurrentUserAndAccount(req.user.id)
    const recipes = await Recipe.findAll({ where: { accountId: account.id } })
    res.json({ recipes })
  },

  async get({ req, res, redis }) {
    const recipeId = req.query.id
    const recipe = await Recipe.findOne({
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
      ],
      order: [
        [RecipeIngredient, 'ordering', 'ASC'],
        [RecipeImage, 'ordering', 'ASC'],
        [RecipeIngredient, 'ordering', 'ASC'],
      ],
    })
    res.json({ recipe })
  },

  async save({ req, res, redis }) {
    const {
      id,
      title,
      ingredients,
      directions,
      images,
      prepTime: { time: prepTime, unit: prepTimeUnits },
      cookTime: { time: cookTime, unit: cookTimeUnits },
      narrative,
    } = req.body

    const { user, account } = await User.getCurrentUserAndAccount(req.user.id)

    let recipe
    if (id) {
      recipe = await Recipe.findOne({
        where: { id, accountId: account.id },
      })
      if (!recipe)
        throw new Error(`We didn't find the recipe you're trying to update.`)
    } else {
      recipe = await Recipe.create({
        accountId: account.id,
        title,
        prepTime,
        prepTimeUnits,
        cookTime,
        cookTimeUnits,
        narrative,
      })
    }

    recipe.title = title
    recipe.prepTime = prepTime
    recipe.prepTimeUnits = prepTimeUnits
    recipe.cookTime = cookTime
    recipe.cookTimeUnits = cookTimeUnits
    recipe.narrative = narrative
    await recipe.save()

    await Promise.all([
      RecipeDirection.syncWithRecipe(recipe.id, directions),
      RecipeImage.syncWithRecipe(recipe.id, images),
      RecipeIngredient.syncWithRecipe(recipe.id, ingredients),
    ])

    res.json({ id: recipe.id })
  },
}

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
    const recipes = await Recipe.findAll({
      where: { accountId: account.id },
      order: [
        ['created_at', 'DESC'],
        [{ model: RecipeImage }, 'ordering', 'ASC'],
      ],
      include: [
        {
          model: RecipeImage,
        },
        {
          model: User,
        },
      ],
    })
    res.json({ recipes })
  },

  async home({ req, res }) {
    const recipes = await Recipe.findAll({
      where: { isLive: true },
      order: [
        ['created_at', 'DESC'],
        [{ model: RecipeImage }, 'ordering', 'ASC'],
      ],
      include: [
        {
          model: RecipeImage,
        },
        {
          model: User,
        },
      ],
    })
    res.json({ recipes })
  },

  async get({ req, res, redis }) {
    try {
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
          {
            model: User,
          },
        ],
        order: [
          [{ model: RecipeDirection }, 'ordering', 'ASC'],
          [{ model: RecipeImage }, 'ordering', 'ASC'],
          [{ model: RecipeIngredient }, 'ordering', 'ASC'],
        ],
      })
      res.json({ recipe })
    } catch (err) {
      // TODO: error log for bad recipe
      res.json({ recipe: null })
    }
  },

  async save({ req, res, redis }) {
    const {
      id,
      title,
      ingredients,
      directions,
      images,
      prepTime,
      cookTime,
      yieldServings,
      narrative,
      isLive,
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
        createdBy: user.id,
        title,
        prepTime: prepTime && prepTime.time,
        prepTimeUnits: prepTime && prepTime.units,
        cookTime: cookTime && cookTime.time,
        cookTimeUnits: cookTime && cookTime.units,
        yieldServings,
        narrative,
      })
    }

    recipe.title = title || recipe.title
    recipe.prepTime = (prepTime && prepTime.time) || recipe.prepTime
    recipe.prepTimeUnits = (prepTime && prepTime.units) || recipe.prepTimeUnits
    recipe.cookTime = (cookTime && cookTime.time) || recipe.cookTime
    recipe.cookTimeUnits = (cookTime && cookTime.units) || recipe.cookTimeUnits
    recipe.yieldServings = yieldServings || recipe.yieldServings
    recipe.narrative = narrative || recipe.narrative
    recipe.isLive = typeof isLive === 'boolean' ? isLive : recipe.isLive
    await recipe.save()

    await Promise.all([
      RecipeDirection.syncWithRecipe(recipe.id, directions),
      RecipeImage.syncWithRecipe(recipe.id, images),
      RecipeIngredient.syncWithRecipe(recipe.id, ingredients),
    ])

    res.json({ id: recipe.id })
  },
}

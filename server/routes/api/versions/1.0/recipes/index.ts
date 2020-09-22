import { sequelize } from '../../../../../sequelize'
import {
  // Account,
  Recipe,
  RecipeDirection,
  RecipeImage,
  RecipeIngredient,
  RecipeTag,
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

  async get({ req, res, log }) {
    try {
      const recipeId = req.query.id
      const recipe = await Recipe.getFullRecipe(recipeId)
      res.json({ recipe })
    } catch (err) {
      log.error(`Error getting recipe`, err)
      res.status(500).json({ recipe: null })
    }
  },

  async save({ req, res }) {
    const {
      id,
      title,
      ingredients,
      directions,
      images,
      tags,
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
      RecipeTag.syncWithRecipe(recipe.id, tags),
    ])

    res.json({ id: recipe.id })
  },

  async export({ req, res }) {
    const recipeId = req.query.id
    const recipe = await Recipe.getFullRecipe(recipeId)
    res.attachment(`recipe.json`)
    res.send(JSON.stringify(recipe))
  },
}

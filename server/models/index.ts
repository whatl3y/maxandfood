import Account from './Account'
import AccountImage from './AccountImage'
import AccountUser from './AccountUser'
import Recipe from './Recipe'
import RecipeDirection from './RecipeDirection'
import RecipeImage from './RecipeImage'
import RecipeIngredient from './RecipeIngredient'
import RecipeTag from './RecipeTag'
import Tag from './Tag'
import User from './User'
import UserIntegration from './UserIntegration'

const models = {
  Account,
  AccountImage,
  AccountUser,
  Recipe,
  RecipeDirection,
  RecipeImage,
  RecipeIngredient,
  RecipeTag,
  Tag,
  User,
  UserIntegration,
}

// based on https://github.com/sequelize/express-example/blob/master/models/index.js
Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})

export {
  Account,
  AccountImage,
  AccountUser,
  Recipe,
  RecipeDirection,
  RecipeImage,
  RecipeIngredient,
  RecipeTag,
  Tag,
  User,
  UserIntegration,
}

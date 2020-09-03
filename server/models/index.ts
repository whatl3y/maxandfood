import User from './User'
import UserIntegration from './UserIntegration'

const models = {
  User,
  UserIntegration,
}

// based on https://github.com/sequelize/express-example/blob/master/models/index.js
Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})

export { User, UserIntegration }

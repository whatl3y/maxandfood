import crypto from 'crypto'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { DataTypes, sequelize } from '../sequelize'

const User = sequelize.define(
  'user',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
  },
  {
    underscored: true,
  }
)

User.prototype.getJwtPayload = function getJwtPayload() {
  return {
    id: this.id,
    expires:
      Date.now() +
      parseInt(process.env.JWT_EXPIRATION_MS || 1000 * 60 * 60 * 24 * 3),
  }
}

User.prototype.getJwtToken = function getJwtToken() {
  return JWT.sign(JSON.stringify(this.getJwtPayload()), process.env.SECRET_KEY)
}

User.prototype.validatePassword = async function validatePassword(
  plainPassword: string
) {
  return await bcrypt.compare(plainPassword, this.password)
}

User.passwordHasMinimumRequirements = function (proposedPassword: string) {
  // TODO: implement minimum
  // const lower = 'abcdefghijklmnopqrstuvwxyz'
  // const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  // const numbers = '0123456789'
  // const special = `~!@#$%^&*()-_=+[{}]\|;:'",./<>?`

  if (proposedPassword.length < 8)
    throw new Error(`Password must be at least 8 characters.`)

  // let numCharacterClasses = 0
  // ;[lower, upper, numbers, special].forEach((charClass) => {
  //   if (charClass.split('').some((char) => proposedPassword.includes(char)))
  //     numCharacterClasses++
  // })

  // if (numCharacterClasses < 3) {
  //   throw new Error(
  //     `Needs at 3 of the following, a lower case, an upper case letter, a number, and/or a special character`
  //   )
  // }

  return true
}

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10)
})

User.associate = (models) => {
  User.hasMany(models.UserIntegration)
}

export default User

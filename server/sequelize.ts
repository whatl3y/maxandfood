// import debug from 'debug'
import Sequelize from 'sequelize'
import log from './logger'

// import EncryptedField from 'sequelize-encrypted'
const EncryptedField = require('sequelize-encrypted')

const isProduction = process.env.NODE_ENV === 'production'

export const encryptedFields = () =>
  EncryptedField(Sequelize, process.env.SECRET_KEY)

export const DataTypes = Sequelize
export const Op = Sequelize.Op

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: (msg) => log.debug(msg),
  typeValidation: true,
  dialectOptions: {
    ssl: isProduction
      ? {
          // Ref.: https://github.com/brianc/node-postgres/issues/2009
          rejectUnauthorized: false,
        }
      : false,
  },
})

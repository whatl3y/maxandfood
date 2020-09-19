import dotenv from 'dotenv'
dotenv.config()

if (!('toJSON' in Error.prototype))
  Object.defineProperty(Error.prototype, 'toJSON', {
    value: function () {
      var alt = {}

      Object.getOwnPropertyNames(this).forEach(function (key) {
        alt[key] = this[key]
      }, this)

      return alt
    },
    configurable: true,
    writable: true,
  })

import { app } from '../express'
import api from './api'
import auth from './auth'
import logout from './logout'
import global from './unprotected/global'
import upload from './unprotected/upload'

app.use('/api', api)
app.use('/auth', auth)
app.use('/logout', logout)

app.use('/unprotected/global', global)
app.use('/unprotected/upload', upload)

export default app

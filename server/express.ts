import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import passport from 'passport'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { redis } from './redis'
import { strategies } from './passport'

const newRouter = () => express.Router()
const app = express()

app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(compression())
app.use(helmet.frameguard())
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))
app.use(cookieParser(process.env.SECRET_KEY))

app.use(passport.initialize())
strategies.forEach((factory) => {
  const strategy = factory({ redis })

  if (
    typeof strategy.bindCondition !== 'function' ||
    strategy.bindCondition()
  ) {
    if (strategy.options) {
      return passport.use(
        strategy.name,
        new strategy.strategy(strategy.options, strategy.handler)
      )
    }

    return passport.use(strategy.name, new strategy.strategy(strategy.handler))
  }
})

// Express error handling
app.use(function ExpressErrorHandler(err, req, res, next) {
  console.error('Express error handling', err)
  res.status(500).json({ error: err.toJSON() })
})

export { app, newRouter }

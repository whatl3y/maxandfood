import passport from 'passport'
import { NextFunction, Request, Response } from 'express'
import { newRouter } from '../../express'
import { redis } from '../../redis'
import apiVersions from './versions'

const router = newRouter()

// const log = bunyan.createLogger(config.logger.options)
// const postgres = new PostgresClient(config.postgres.connection_string, {
//   logger: log,
// })

router.all('/:version/:namespace/:command*', [
  jwtAuthMiddleware,
  async function handler(req: Request, res: Response) {
    const version = req.params.version
    const namespace = req.params.namespace
    const command = req.params.command
    const additional = req.params[0]
    const finalCommand = additional ? `${command}${additional}` : command

    try {
      await apiVersions[version][namespace][finalCommand]({
        req,
        res,
        // log,
        // postgres,
        redis,
      })
    } catch (err) {
      res.status(500).json({ error: err.toJSON() })
    }
  },
])

export function jwtAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate('jwt', { session: false }, function (err, user) {
    // TODO: what to do here by default if bad, expired, or no token?
    if (err) return res.status(500).json({ error: err.toJSON() })
    if (!user) return res.json(null)

    req.user = user
    next()
  })(req, res, next)
}

export default router

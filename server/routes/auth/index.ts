import passport from 'passport'
import { NextFunction, Request, Response } from 'express'
import { newRouter } from '../../express'
import { redis } from '../../redis'
import User from '../../models/User'

const router = newRouter()

/**
 * Authenticate with google
 */
router.post(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline', //returns the refresh token
  })
)

/**
 * Callback for authentication with google
 */
router.post('/google/callback', async function googleCallbackHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate('google', handleUserLogin(req, res))(req, res, next)
})

/**
 * Login with the local strategy
 */
router.post('/login', async function loginHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate('local', handleUserLogin(req, res))(req, res, next)
})

/**
 * After passport processes logging in from a standard
 * passport strategy process JWT token and send back to user
 * in a cookie.
 */
function handleUserLogin(req: Request, res: Response) {
  return function (error: Error, user: User) {
    if (error) {
      return res.status(400).json({ error: error.toJSON() })
    }

    if (!user) {
      return res.status(400).json({
        error: new Error(
          `Please enter your username and password to login.`
        ).toJSON(),
      })
    }

    const payload = user.getJwtPayload()

    /** assigns payload to req.user */
    req.login(payload, { session: false }, async (error: Error) => {
      try {
        if (error) {
          return res.status(400).json({ error: error.toJSON() })
        }

        const token = user.getJwtToken()

        /** assign our jwt to the cookie */
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        res.json(true)
      } catch (err) {
        return res.status(500).json({ error: err.toJSON() })
      }
    })
  }
}

export default router

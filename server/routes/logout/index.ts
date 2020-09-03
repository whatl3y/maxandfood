import { Request, Response } from 'express'
import { newRouter } from '../../express'

const router = newRouter()

/**
 * Manual logout
 */
router.use(function logoutHandler(req: Request, res: Response) {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
  res.redirect('/')
})

export default router

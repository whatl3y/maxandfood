import Google from '../../../passport/google'
import { Request, Response } from 'express'
import { sequelize } from '../../../sequelize'
import { newRouter } from '../../../express'
import { Account, AccountImage, Tag } from '../../../models'
import { arrayGroupBy } from '../../../utils'

const google = Google()
const router = newRouter()

// router.get('/aws', (_, res: Response) => {
//   res.json({
//     bucketUrl: process.env.AWS_S3_UPLOAD_BUCKET_URL
//   })
// })

router.get('/bodyimages', async (req: Request, res: Response) => {
  const images = await AccountImage.findAll({
    where: {
      isEnabled: true,
      [`$account.domain_name$`]: req.get('host'),
    },
    include: [
      {
        model: Account,
      },
    ],
  })
  const groupedImgs = arrayGroupBy(images, (i) => i.position || '')

  res.json({
    images: Object.values(groupedImgs).reduce((ary: any[], posImgs: any) => {
      const el = posImgs[Math.floor(Math.random() * posImgs.length)]
      return ary.concat([el])
    }, []),
  })
})

router.get('/tags', async (req: Request, res: Response) => {
  res.json({
    tags: await Tag.findAll({
      order: [sequelize.fn('lower', sequelize.col('name'))],
    }),
  })
})

router.get('/integrations', (_, res: Response) => {
  res.json({
    integrations: { google: google.bindCondition() },
  })
})

export default router

import fs from 'fs'
import formidable from 'express-formidable'
import { Request, Response } from 'express'
import { newRouter } from '../../../express'
import { uploadObject, getFileName } from '../../../aws'
import { resizeImage, imageToSquare } from '../../../images'
// import { AccountImage, RecipeImage } from '../../../models'
import { jwtAuthMiddleware } from '../../api'

const router = newRouter()

router.use(formidable({ multiples: true }))

router.post('/image', [
  jwtAuthMiddleware,
  async (req: Request, res: Response) => {
    const { name, /* size,*/ path /*, type*/ } = req.files.file
    const resizedImgBuffer = await resizeImage(path)
    const squareImgBuffer = await imageToSquare(resizedImgBuffer)
    const imgFilename = `${req.user.id}/${name}`

    const [uploadRes, resizedRes] = await Promise.all([
      uploadObject(imgFilename, await fs.promises.readFile(path)),
      uploadObject(getFileName(`${imgFilename}.jpeg`), squareImgBuffer),
    ])
    res.json({
      imageName: uploadRes.name,
      imageNameOptimized: resizedRes.name,
    })
  },
])

export default router

import sharp from 'sharp'

export async function resizeImage(img: Buffer | string): Promise<Buffer> {
  return await sharp(img).rotate().resize({ width: 800 }).jpeg().toBuffer()
}

export async function imageToSquare(img: Buffer | string): Promise<Buffer> {
  const shImg = sharp(img)
  const { width, height } = await shImg.metadata()
  const length = Math.min(width || 0, height || 0)
  if (length === 0) {
    throw new Error(
      `cannot make image square because width, height metadata is unavailable`
    )
  }

  const left = Math.floor((width || length) / 2 - length / 2)
  const top = Math.floor((height || length) / 2 - length / 2)
  return await shImg
    .extract({
      left,
      top,
      width: length,
      height: length,
    })
    .toBuffer()
}

import path from 'path'
import AWS from 'aws-sdk'

const DEFAULT_PARAMS = { Bucket: process.env.AWS_S3_UPLOAD_BUCKET_NAME }

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export async function uploadObject(
  name: string,
  data: Buffer | string,
  method: 'putObject' | 'upload' = 'putObject'
) {
  const uniqueFilename = getFileName(name)
  const params: AWS.S3.PutObjectRequest = {
    ...DEFAULT_PARAMS,
    Key: uniqueFilename,
    Body: data,
  }

  const response = await s3[method](params).promise()
  return { response, name: uniqueFilename }
}

export function getFileName(
  fileName: string,
  extraText: number | string = Date.now()
): string {
  fileName = encodeURIComponent(fileName)
  return `${fileName
    .split('.')
    .slice(0, -1)
    .join('.')}_${extraText}${path.extname(fileName)}`
}

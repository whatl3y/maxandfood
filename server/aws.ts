import path from 'path'
import { Readable } from 'stream'
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'

const DEFAULT_PARAMS = { Bucket: process.env.AWS_S3_UPLOAD_BUCKET_NAME }

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export async function uploadObject(
  name: string,
  data: Buffer | Readable | string,
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
  fileName: string
  // extraText: number | string = Date.now()
): string {
  const filepathSplit = fileName.split('/')
  const encodedFilename = encodeURIComponent(
    filepathSplit[filepathSplit.length - 1]
  )
  // const finalName = `${encodedFilename
  //   .split('.')
  //   .slice(0, -1)
  //   .join('.')}_${extraText}${path.extname(encodedFilename)}`
  return `${filepathSplit.slice(
    0,
    filepathSplit.length - 1
  )}/${uuidv4()}${path.extname(encodedFilename)}`
}

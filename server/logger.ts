import bunyan from 'bunyan'

// import createCWStream from 'bunyan-cloudwatch'
const createCWStream = require('bunyan-cloudwatch')

const loggerOptions = {
  name: 'maxandfood',
  level: process.env.LOGGING_LEVEL || 'info',
  streams: [
    {
      stream: process.stdout,
    },
    {
      stream: createCWStream({
        logGroupName:
          process.env.AWS_CLOUDWATCH_LOGS_GROUP || 'maxandfood',
        logStreamName:
          process.env.AWS_CLOUDWATCH_LOGS_STREAM || 'anonymous',
        cloudWatchLogsOptions: {
          region: process.env.AWS_CLOUDWATCH_LOGS_REGION || 'us-east-1',
        },
      }),
      type: 'raw',
    },
  ],
}

export default bunyan.createLogger(loggerOptions)

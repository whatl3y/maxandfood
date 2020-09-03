import PassportLocal from 'passport-local'
import User from '../models/User'

const LocalStrategy = PassportLocal.Strategy

export default function LocalPassportStrategy({ redis }) {
  return {
    name: 'local',
    strategy: LocalStrategy,
    options: {
      passReqToCallback: true,
    },
    handler: async function PassportLocalHandler(
      req,
      username,
      password,
      done
    ) {
      try {
        if (!password) throw new Error(`No password provided...`)

        username = username.toLowerCase()
        let userRecord = await User.findOne({ where: { email: username } })
        if (userRecord) {
          // If the user has tried to login 3 times unsuccessfully, presumably
          // due to an incorrect password each time, require them to wait
          // up to 5 minutes to retry. This will prevent bots from trying
          // to login as another user with a script.
          const badPasswordKey = `incorrect_password_${username}`
          const currentBadCount = await redis.get(badPasswordKey)
          if (currentBadCount && currentBadCount > 3)
            throw new Error(
              `You've tried your password incorrectly too many times.`
            )

          if (!userRecord.password) throw new Error(`No password yet.`)

          const isCorrectPassword = await userRecord.validatePassword(password)
          if (!isCorrectPassword) {
            const pipeline = redis
              .pipeline()
              .incr(badPasswordKey)
              .expire(badPasswordKey, 60 * 5)
            await pipeline.exec()
            throw new Error(`Incorrect password provided.`)
          }
        } else {
          // throws if it doesn't meet requirements
          User.passwordHasMinimumRequirements(password)

          userRecord = User.build({ email: username })
          userRecord.password = password
          userRecord.lastLogin = new Date()
          await userRecord.save()
        }

        done(null, userRecord)
      } catch (err) {
        done(err)
        throw err
      }
    },
  }
}

import PassportGoogle from 'passport-google-oauth20'
import { User, UserIntegrations } from '../models'

const GoogleStrategy = PassportGoogle.Strategy

export default function GooglePassportStrategy() {
  return {
    name: 'google',
    strategy: GoogleStrategy,
    options: {
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL: `${process.env.URL}/auth/google/callback`,
      passReqToCallback: true,
    },
    bindCondition() {
      return !!this.options.clientID
    },
    handler: async function GooglePassportHandler(
      req,
      accessToken,
      refreshToken,
      profile,
      done
    ) {
      try {
        const emailAddress = profile.emails[0].value.toLowerCase()

        const user = await User.findOrCreate({
          where: {
            email: emailAddress,
          },
        })
        const integration = await UserIntegrations.findOrCreate({
          type: 'google',
          userId: user.id,
        })

        user.firstName = user.firstName || profile.name.givenName
        user.lastName = user.lastName || profile.name.familyName
        user.lastLogin = new Date()

        integration.uid = profile.id
        integration.accessToken = accessToken
        integration.refreshToken = refreshToken
        integration.expires = profile.expires

        await Promise.all([user.save(), integration.save()])

        done(null, user)
      } catch (err) {
        done(err)
      }
    },
  }
}

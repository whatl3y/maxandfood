import PassportJWT from 'passport-jwt'

const JWTStrategy = PassportJWT.Strategy

export default function JWTPassportStrategy() {
  return {
    name: 'jwt',
    strategy: JWTStrategy,
    options: {
      jwtFromRequest: (req) => req.cookies.jwt,
      secretOrKey: process.env.SECRET_KEY,
    },
    handler: async function PassportJWTHandler(jwtPayload, done) {
      if (Date.now() > jwtPayload.expires) {
        // TODO: revoke token and force reauth
        return done(new Error('JWT token has expired'))
      }

      done(null, jwtPayload)
    },
  }
}

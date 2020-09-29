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
      if (Date.now() > jwtPayload.expires) return done()
      done(null, jwtPayload)
    },
  }
}

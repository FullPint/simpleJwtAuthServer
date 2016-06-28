import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'
import {jwtConfig} from '~./server.config.js'
import User from '~./app/models/users/user.model'

const passportAuth = (passport) => {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  opts.secretOrKey = jwtConfig.secret
  opts.issuer = 'localhost:1600'
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({id: jwt_payload.sub}, (err, user) => {
      if (err) {
        return done(err, false)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}

export default passportAuth

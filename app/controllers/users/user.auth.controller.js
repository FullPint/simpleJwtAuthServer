import jwt from 'jwt-simple'
import User from '~/app/models/users/user.model'
import {jwtConfig} from '~./server.config'

const userAuth = (req, res) => {
  User.findOne({
    userName: req.body.userName
  }, (err, user) => {
    if (err) {
      throw err
    } else if (!user) {
      res.send({
        success: false,
        message: 'Auth failed: no user'
      })
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        const expires = 1372674336
        if (isMatch && !err) {
          const token = jwt.encode({iss: user, exp: expires}, jwtConfig.secret)
          res.json({
            success: true,
            token: token
          })
        } else {
          res.send({
            success: false,
            message: 'Authentication failed'
          })
        }
      })
    }
  })
}

export default userAuth

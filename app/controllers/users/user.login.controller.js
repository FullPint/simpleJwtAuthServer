import jwt from 'jsonwebtoken'
import User from '~/app/models/users/user.model'
import {jwtConfig} from '~./server.config'

const UserLogin = (req, res) => {
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
        if (isMatch && !err) {
          const token = jwt.sign(user, jwtConfig.secret, {
            expiresIn: 60 * 60 * 24
          })
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

export default UserLogin

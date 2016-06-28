import jwt from 'jsonwebtoken'
import {jwtConfig} from '~./server.config'

const UserAuth = function (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    console.log('it comes here')
    jwt.verify(token, jwtConfig.secret, function (err, decoded) {
      console.log('but never here')
      if (err) {
        return res.json({
          success: false,
          message: 'invalid token'
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
}

export default UserAuth

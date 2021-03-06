import jwt from 'jsonwebtoken'
import {jwtConfig} from '~./server.config'

const UserAuth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
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

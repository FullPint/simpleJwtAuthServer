// Setting up our main router constant
import express from 'express'
const mainRouter = express.Router()

// importing our controllers
import UserCreate from '~/app/controllers/users/user.create.controller'
import UserLogin from '~/app/controllers/users/user.login.controller'
import UserAuth from '~/app/controllers/users/user.auth.controller'

// our main route responds with JSON
mainRouter.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Our main route works'
  })
})

// Singup Route
mainRouter.post('/signup', UserCreate)

// Login route
mainRouter.post('/login', UserLogin)

// Auth Middleware
mainRouter.use('/api', UserAuth)
mainRouter.get('/api/v1', (req, res) => {
  res.json({
    message: 'success'
  })
})

// exporting mainRouter for use
export default mainRouter

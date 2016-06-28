// Setting up our main router constant
import express from 'express'
const mainRouter = express.Router()

// importing our controllers
import UserCreate from '~/app/controllers/users/user.create.controller'
import UserLogin from '~/app/controllers/users/user.login.controller'

// our main route responds with JSON
mainRouter.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Our main route works'
  })
})

// Singup Route
mainRouter.post('/signup', UserCreate)

// Auth route
mainRouter.post('/login', UserLogin)
// exporting mainRouter for use
export default mainRouter

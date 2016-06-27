// Setting up our main router constant
import express from 'express'
const mainRouter = express.Router()

// our main route responds with JSON
mainRouter.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Our main route works'
  })
})

// exporting the module for use
export default mainRouter

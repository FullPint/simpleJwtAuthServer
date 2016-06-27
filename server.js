// Initializing our app
import express from 'express'
const app = express()

// importing our needed modules
import morgan from 'morgan'

// setting our Port
const PORT = 1600

// setting our logger to dev mode
app.use(morgan('dev'))

// having our application listen on our specified Port
app.listen(PORT, () => {
  console.log('Your app is running on PORT: ' + PORT)
})

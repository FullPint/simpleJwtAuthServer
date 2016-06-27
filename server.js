// Initializing our app
import express from 'express'
const app = express()

// importing our needed modules
import morgan from 'morgan'
import mongoose from 'mongoose'

// setting our configs
import {appConfig, dbConfig} from './server.config'
const PORT = appConfig.port

// connecting to new db
mongoose.connect(dbConfig.db)

// setting our logger to dev mode
app.use(morgan('dev'))

// having our application listen on our specified Port
app.listen(PORT, () => {
  console.log('Your app is running on PORT: ' + PORT)
})

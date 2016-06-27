// Initializing our app
import express from 'express'
const app = express()

// importing our needed modules
import morgan from 'morgan'
import mongoose from 'mongoose'
import boodyParser from 'body-parser'

// setting our configs
import {appConfig, dbConfig} from './server.config'
const PORT = appConfig.port

// connecting to new db
mongoose.connect(dbConfig.db)

// setting up boodyParser
app.use(boodyParser.urlencoded({
  extended: false
}))
app.use(boodyParser.json())

// setting our logger to dev mode
app.use(morgan('dev'))

// initializing our main router entry point
import mainRouter from './app/routes/main.router'
app.use('/', mainRouter)

// having our application listen on our specified Port
app.listen(PORT, () => {
  console.log('Your app is running on PORT: ' + PORT)
})

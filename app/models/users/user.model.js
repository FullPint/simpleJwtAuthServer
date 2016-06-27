// Importing needed modules
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// setting up our schema
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true

  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
})

UserSchema.pre('save', (next) => {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.has(user.password, salt, (err, hash) => {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = (password, callback) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err)
    }
    callback(null, isMatch)
  })
}

export default mongoose.model('User', UserSchema)

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

UserSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
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

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return callback(err)
    }
    callback(null, isMatch)
  })
}

export default mongoose.model('User', UserSchema)

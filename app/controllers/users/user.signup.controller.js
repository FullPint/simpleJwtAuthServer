import User from '~/app/models/users/user.model'

const UserCreate = (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.json({
      success: false,
      message: 'Please enter a valid Username and Password'
    })
  } else {
    const newUser = new User({
      name: req.body.name,
      password: req.body.password
    })
    newUser.save((err) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Username exists'
        })
      } else {
        res.json({
          success: true,
          message: 'New user created'
        })
      }
    })
  }
}

export default UserCreate

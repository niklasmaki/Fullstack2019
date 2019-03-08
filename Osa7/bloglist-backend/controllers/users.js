const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  try {

    const body = request.body
    if (!body.password) {
      console.error("Password is required!")
      return response.status(400).json("error: Password is required") 
    }
    if (body.password.length < 3) {
      console.error("Password too short!")
      return response.status(400).json("error: Password too short")
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (exception) {
    console.error(exception)
    response.status(400).json("error: " + exception.message)
  }
})

module.exports = userRouter
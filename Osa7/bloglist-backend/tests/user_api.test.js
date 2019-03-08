const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

test('Users without username are not created', async () => {
  const invalidUser = {
    password: "test",
    name: "User"
  }

  const result = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)

  expect(result.text).toContain('Path `username` is required')

  const users = await User.find({})
  expect(users.length).toBe(0)
})

test('Users without password are not created', async () => {
  const invalidUser = {
    username: "test",
    name: "User"
  }

  const result = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)

  expect(result.text).toContain('Password is required')

  const users = await User.find({})
  expect(users.length).toBe(0)
})

test('Users with too short username are not created', async () => {
  const invalidUser = {
    username: "te",
    password: "password",
    name: "User"
  }

  const result = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)

  expect(result.text).toContain('is shorter than the minimum allowed length')

  const users = await User.find({})
  expect(users.length).toBe(0)
})

test('Users with too short password are not created', async () => {
  const invalidUser = {
    username: "user",
    password: "12",
    name: "User"
  }

  const result = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)

  expect(result.text).toContain('Password too short')

  const users = await User.find({})
  expect(users.length).toBe(0)
})

describe('If there is a user in the database', async () => {
  beforeEach(async () => {
    const user = new User({
      username: "testuser",
      passwordHash: "$2b$10$bPm2x972s7heIxtahwPktu1zOyMOECJhFUwoU4TLTGvDTAWEbPDmu",
      name: "Niklas"
    })
    await user.save()
  })

  test('A user is not created if the username exists', async () => {
    const user = {
      username: "testuser",
      password: "password",
      name: "Kalle"
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(result.text).toContain('expected `username` to be unique')

    const users = await User.find({})
    expect(users.length).toBe(1)
    expect(users[0].name).toBe("Niklas")
  })
})


afterAll(() => {
  mongoose.connection.close()
})
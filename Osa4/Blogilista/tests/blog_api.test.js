const Blog = require('../models/blog')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogSavePromises = initialBlogs
    .map(blog => new Blog(blog))
    .map(blog => blog.save())

  await Promise.all(blogSavePromises)
})

test('all blogs are returned', async () => {
  const blogs = await api.get('/api/blogs')

  expect(blogs.body.length).toBe(initialBlogs.length)
})

test('blog contains a field named id', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[0].id).toBeDefined()
})

test('blogs can be added', async () => {
  const blogsBefore = await api.get('/api/blogs')
  const newBlog = {
    title: "New blog",
    author: "Niklas M",
    url: "http://www.blog.com",
    likes: 9000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAfter = await api.get('/api/blogs')
  expect(blogsAfter.body.length).toBe(blogsBefore.body.length + 1)

  const titles = blogsAfter.body.map(blog => blog.title)
  expect(titles).toContain('New blog')
})

test('blogs added without likes get 0 likes', async () => {
  const newBlog = {
    title: "Best blog",
    author: "Niklas M",
    url: "http://www.blog.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAfter = await api.get('/api/blogs')
  const addedBlog = blogsAfter.body.find(blog => blog.title === 'Best blog')
  expect(addedBlog.likes).toBe(0)
})

test('blogs cannot be added without title', async () => {
  const blogWithoutTitle = {
    author: "Niklas M",
    url: "http://www.blog.com" 
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)
})

test('blogs cannot be added without url', async () => {
  const blogWithoutUrl = {
    title: "Best blog",
    author: "Niklas M"
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)
})

test('blogs can be deleted', async () => {
  const blogsBefore = await api.get('/api/blogs') 
  const id = blogsBefore.body[1].id

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)
    
  const blogsAfter = await api.get('/api/blogs') 

  expect(blogsAfter.body.length).toBe(blogsBefore.body.length - 1)

  const ids = blogsAfter.body.map(blog => blog.id)
  expect(ids).not.toContain(id)
})

afterAll(() => {
  mongoose.connection.close()
})
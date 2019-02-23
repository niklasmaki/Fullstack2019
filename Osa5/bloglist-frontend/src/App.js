import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const Notification = ({ message }) => {
  if (!message) return null

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (!message) return null

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyError("Wrong username or password")
    }
  }

  const handleLogout = async event => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleNewBlog = async event => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url
      })
      notify(`A new blog ${title} by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(newBlog))
    } catch (exception) {
      notifyError("The blog couldn't be added")
    }
  }

  const notify = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const notifyError = message => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <ErrorNotification message={error} />
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button
            type="submit">
            Log in
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} />
      <ErrorNotification message={error} />
      <p>{user.name} logged in</p>
      <div>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>Add a new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button>
          Add
        </button>
      </form>
    </div>
  )
}

export default App
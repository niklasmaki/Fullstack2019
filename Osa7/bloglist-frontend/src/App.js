import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import useField from './hooks/index'
import { setNotification } from './reducers/notificationReducer'

const App = props => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

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
        username: username.value, password: password.value
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification('Wrong username or password', 5, 'error')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleNewBlog = async event => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title: title.value,
        author: author.value,
        url: url.value
      })
      props.setNotification(
        `A new blog ${title.value} by ${author.value} added`, 5, 'success')
      title.reset()
      author.reset()
      url.reset()
      setBlogs(blogs.concat(newBlog))
    } catch (exception) {
      props.setNotification('The blog couldn\'t be added', 5, 'error')
    }
  }

  const removeBlog = blog => {
    return async () => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        try {
          await blogService.remove(blog.id)
          setBlogs(blogs.filter(b => {
            return b.id !== blog.id
          }))
        } catch (exception) {
          props.setNotification('The blog couldn\'t be removed', 5, 'error')
        }
      }
    }
  }

  const likeBlog = blog => {
    return async () => {
      const likedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      await blogService.update(likedBlog)
      setBlogs(blogs.map(b => {
        if (b.id !== blog.id) return b
        return likedBlog
      }))
    }
  }

  const sortByLikes = (a, b) => {
    return b.likes - a.likes
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification notification={props.notification} />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={props.notification} />
      <p>{user.name} logged in</p>
      <div>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
      {blogs.sort(sortByLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={likeBlog(blog)}
          handleRemove={removeBlog(blog)}
          loggedInUser={user}
        />
      )}
      <h2>Add a new blog</h2>
      <Togglable buttonLabel={'Add a new blog'}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleNewBlog={handleNewBlog}
        />
      </Togglable>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  { setNotification }
)(App)
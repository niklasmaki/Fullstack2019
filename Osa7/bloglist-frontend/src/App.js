import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import useField from './hooks/index'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, likeBlog, addBlog, removeBlog } from './reducers/blogReducer'
import { loginUser, logoutUser, initUser } from './reducers/userReducer'

const App = props => {
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    props.initBlogs()
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      props.initUser(JSON.parse(loggedInUser))
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    const handleError = () => {
      props.setNotification('Wrong username or password', 5, 'error')
    }
    props.loginUser(username.value, password.value, handleError)

    username.reset()
    password.reset()
  }

  const handleNewBlog = async event => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    const handleSuccess = () => {
      props.setNotification(
        `A new blog ${title.value} by ${author.value} added`, 5, 'success')
    }
    const handleError = () => {
      props.setNotification('The blog couldn\'t be added', 5, 'error')
    }
    props.addBlog(newBlog, handleSuccess, handleError)

    title.reset()
    author.reset()
    url.reset()

  }

  const handleRemoveBlog = blog => {
    return () => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        const handleError = () => {
          props.setNotification('The blog couldn\'t be removed', 5, 'error')
        }
        props.removeBlog(blog.id, handleError)
      }
    }
  }

  const handleLikeBlog = blog => {
    return () => {
      props.likeBlog(blog)
    }
  }

  const sortByLikes = (a, b) => {
    return b.likes - a.likes
  }

  if (!props.user) {
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
      <p>{props.user.name} logged in</p>
      <div>
        <button onClick={props.logoutUser}>
          Logout
        </button>
      </div>
      {props.blogs.sort(sortByLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLikeBlog(blog)}
          handleRemove={handleRemoveBlog(blog)}
          loggedInUser={props.user}
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
    blogs: state.blogs,
    notification: state.notification,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {
    setNotification, initBlogs, likeBlog, addBlog, removeBlog,
    loginUser, logoutUser, initUser
  }
)(App)
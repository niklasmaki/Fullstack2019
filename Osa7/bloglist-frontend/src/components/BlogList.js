import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import useField from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, addBlog, removeBlog, initBlogs } from '../reducers/blogReducer'

const BlogList = props => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    props.initBlogs()
    console.log('init done')
  }, [])

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

  return (
    <div>
      {props.blogs.sort(sortByLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLikeBlog(blog)}
          handleRemove={handleRemoveBlog(blog)}
          loggedInUser={props.user}
        />
      )}
      <h2> Add a new blog</h2>
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
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {
    setNotification, likeBlog, addBlog, removeBlog, initBlogs
  }
)(BlogList)
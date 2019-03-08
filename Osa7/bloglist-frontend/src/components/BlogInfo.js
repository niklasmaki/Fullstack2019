import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import {
  withRouter
} from 'react-router-dom'

const BlogInfo = props => {
  if (!props.location.state) return null
  const id = props.location.state.id

  const blog = props.blogs.find(blog => blog.id === id)

  const removeButtonStyle = {
    display: props.user.username === blog.user.username ? '' : 'none'
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const handleError = () => {
        props.setNotification('The blog couldn\'t be removed', 5, 'error')
      }
      const handleSuccess = () => {
        props.history.push('/')
      }
      props.removeBlog(blog.id, handleSuccess, handleError)
    }
  }

  const handleLike = () => {
    props.likeBlog(blog)
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>Like</button>
      </div>
      <div>
        Added by {blog.user.name}
      </div>
      <div style={removeButtonStyle}>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    setNotification, likeBlog, removeBlog
  }
)(BlogInfo))
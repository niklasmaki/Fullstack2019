import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import useField from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, addBlog, removeBlog, initBlogs } from '../reducers/blogReducer'
import { Table } from 'react-bootstrap'

const BlogList = props => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    props.initBlogs()
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
    props.addBlog(newBlog, props.user, handleSuccess, handleError)

    title.reset()
    author.reset()
    url.reset()

  }

  const sortByLikes = (a, b) => {
    return b.likes - a.likes
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Table>
        <tbody>
          {props.blogs.sort(sortByLikes).map(blog =>
            <tr key={blog.id}>
              <Blog
                blog={blog}
              />
            </tr>
          )}
        </tbody>
      </Table>
      <h2> Add a new blog</h2>
      <Togglable buttonId='toggleBlogForm' buttonLabel={'Add a new blog'}>
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
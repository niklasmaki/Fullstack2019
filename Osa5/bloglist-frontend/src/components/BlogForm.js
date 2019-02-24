import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  title,
  author,
  url,
  handleNewBlog
}) => (
  <form onSubmit={handleNewBlog}>
    <div>
      Title:
      <input {...title}/>
    </div>
    <div>
      Author:
      <input {...author}/>
    </div>
    <div>
      URL:
      <input {...url}/>
    </div>
    <button>
      Add
    </button>
  </form>
)

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default BlogForm
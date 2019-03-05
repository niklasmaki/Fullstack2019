import React from 'react'
import PropTypes from 'prop-types'

const getFieldWithoutReset = field => {
  const { reset, ...result } = field
  return result
}

const BlogForm = props => {
  const title = getFieldWithoutReset(props.title)
  const author = getFieldWithoutReset(props.author)
  const url = getFieldWithoutReset(props.url)

  return (
    <form onSubmit={props.handleNewBlog}>
      <div>
        Title:
        <input {...title} />
      </div>
      <div>
        Author:
        <input {...author} />
      </div>
      <div>
        URL:
        <input {...url} />
      </div>
      <button>
        Add
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default BlogForm
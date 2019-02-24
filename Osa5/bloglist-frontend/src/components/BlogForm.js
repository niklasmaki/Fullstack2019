import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleNewBlog
}) => (
    <form onSubmit={handleNewBlog}>
      <div>
        Title:
          <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author:
          <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        URL:
          <input
          type="text"
          value={url}
          name="URL"
          onChange={handleUrlChange}
        />
      </div>
      <button>
        Add
        </button>
    </form>
  )

  BlogForm.propTypes = {
    handleTitleChange: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
    handleNewBlog: PropTypes.func.isRequired, 
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }

  export default BlogForm
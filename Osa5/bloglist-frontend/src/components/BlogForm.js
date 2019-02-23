import React from 'react'

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

  export default BlogForm
import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, loggedInUser }) => {

  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    display: loggedInUser.username === blog.user.username ? '' : 'none'
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  if (showInfo) {
    return (
      <div style={blogStyle}>
        <div onClick={toggleInfo}>
        {blog.title} {blog.author}
        </div>
        <div>
          {blog.url}
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

  return (
    <div onClick={toggleInfo}  style={blogStyle}>
      {blog.title} {blog.author}
    </div>
  )
}

export default Blog
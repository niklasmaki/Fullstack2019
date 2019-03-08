import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <>
      <td className='title'>
        <Link to={{
          pathname: `/blogs/${blog.id}`,
          state: { id: blog.id }
        }}>
          {blog.title}
        </Link>
      </td>
      <td>
        {blog.author}
      </td>
    </>
  )
}

export default Blog
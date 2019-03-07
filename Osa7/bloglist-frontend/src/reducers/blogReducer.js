import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'BLOG_LIKE':
      return state.map(blog => {
        if (blog.id === action.data.id) {
          return action.data
        }
        return blog
      })
    case 'BLOG_ADD':
      return state.concat(action.data)
    case 'BLOG_INIT':
      return action.data
    case 'BLOG_REMOVE':
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOG_INIT',
      data: blogs
    })
  }
}

export const likeBlog = blog => {
  const likedBlog = {
    ...blog,
    likes: blog.likes + 1
  }
  return async dispatch => {
    await blogService.update(likedBlog)
    dispatch({
      type: 'BLOG_LIKE',
      data: likedBlog
    })
  }
}

export const addBlog = (content, handleSuccess, handleError) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'BLOG_ADD',
        data: newBlog
      })
      handleSuccess()
    } catch (exception) {
      handleError()
    }
  }
}

export const removeBlog = (id, handleError) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'BLOG_REMOVE',
        data: {
          id
        }
      })
    } catch (exception) {
      handleError()
    }
  }
}

export default reducer
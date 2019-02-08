var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => (
  blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
)

const favoriteBlog = (blogs) => {
  if (!blogs || !blogs.length) return {} 

  const favoriteBlog = blogs
    .reduce((mostLikedBlog, blog) => {
      if (!mostLikedBlog.likes || blog.likes > mostLikedBlog.likes) {
        return blog
      }
      return mostLikedBlog
    }, {})

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }
}

const mostBlogs = (blogs) => {
  if (!blogs || !blogs.length) return {}

  const mostBlogs = _.chain(blogs)
    .countBy('author')
    .toPairs()
    .orderBy(pair => pair[1], ["desc"])
    .get(0)
    .value()

  return {
    author: mostBlogs[0],
    blogs: mostBlogs[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
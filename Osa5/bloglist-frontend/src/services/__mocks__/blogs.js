const blogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'niklas',
      name: 'Niklas Mäki',
      id: '5c653abb272ad456d471f2d3'
    }
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      username: 'niklas',
      name: 'Niklas Mäki',
      id: '5c653abb272ad456d471f2d3'
    }
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      username: 'admin',
      name: 'Admin User',
      id: '5c653abb272ad456d412415111'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
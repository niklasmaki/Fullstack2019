
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const create = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const result = await axios.post(baseUrl, blog, config)
  return result.data
}

const update = async blog => {
  console.log(blog)
  const result = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return result.data
}

export default { getAll, create, update, setToken }
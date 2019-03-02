import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async anecdote => {
  const response = await axios.post(baseUrl, {
    content: anecdote,
    votes: 0
  })
  return response.data
}

const vote = async id => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const response = await axios
    .put(`${baseUrl}/${id}`, {
      ...anecdote.data, 
      votes: anecdote.data.votes + 1
    })
    return response
}

export default { getAll, create, vote }
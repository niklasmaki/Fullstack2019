import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => (
  axios
    .get(baseUrl)
    .then(response => response.data)
)

const add = person => (
  axios
    .post(baseUrl, person)
    .then(response => response.data)
)

const remove = id => (
  axios
    .delete(`${baseUrl}/${id}`)
    .then(response => console.log(response))
)

export default { getAll, add, remove }
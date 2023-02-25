import { useState } from 'react'

const uniqueValues = (value, index, array) => {
  return array.indexOf(value) === index
}

const Books = (props) => {
  const [genre, setGenre] = useState('all')

  if (!props.show) {
    return null
  }

  const genres = props.books.flatMap(b => b.genres).filter(uniqueValues)

  const books = genre === 'all' ? 
                props.books :
                props.books.filter(b => b.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {genres.map(g => (
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      ))}
      <button onClick={() => setGenre('all')}>all genres</button>
      </div>
    </div>
  )
}

export default Books

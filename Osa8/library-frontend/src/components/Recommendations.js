const Recommendations = (props) => {

  if (!props.show) {
    return null
  }

  const books = props.books.filter(b => b.genres.includes(props.genre))

  return (
    <div>
      <h2>recommendations</h2>

      <span>Books in your favourite genre <b>{props.genre}</b></span>

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
    </div>
  )
}

export default Recommendations

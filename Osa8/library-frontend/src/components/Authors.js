import { useState, useReducer } from "react";
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState('Robert Martin');
  const [bornYear, setBornYear] = useState('');

  const [ updateAuthorQuery ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]  
  })

  if (!props.show) {
    return null;
  }
  const authors = props.authors;



  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSelectedAuthor(event.target.value );
  };

  const handleBornYearChange = (event) => {
    console.log(event.target.value);
    setBornYear(event.target.value);
  };

  const updateAuthor = () => {
    console.log(selectedAuthor)
    console.log(bornYear)
    updateAuthorQuery({ variables: { name: selectedAuthor, setBornTo: parseInt(bornYear) } })
    props.forceUpdate()
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <select defaultValue={'Robert Martin'} onChange={handleSelectChange}>
        {authors.map((a) => (
          <option key={a.name} value={a.name}>
            {a.name}
          </option>
        ))}
      </select>
      <div>
        <label>born</label>
        <input type="number" onChange={handleBornYearChange}></input>
      </div>
      <div>
        <button onClick={updateAuthor}>Update author</button>
      </div>
    </div>
  );
};

export default Authors;

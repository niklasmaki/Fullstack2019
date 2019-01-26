import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, updateFilter }) => (
  <div>
    Rajaa: <input value={filter} onChange={updateFilter} />
  </div>
)

const PersonForm = ({ addPerson, newName, updateNewName, newNumber, updateNewNumber }) => (
  <form onSubmit={addPerson}>
    <div>
      Nimi: <input value={newName} onChange={updateNewName} />
    </div>
    <div>
      Numero: <input value={newNumber} onChange={updateNewNumber} />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
)

const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
)

const Persons = ({ persons, filter }) => {

  const getPersons = () => (
    persons.filter(
      person => new RegExp(filter, "i").test(person.name)
    ).map(
      person => <Person key={person.name} person={person} />
    )
  )

  return (
    <div>
      {getPersons()}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const updateNewName = (event) => {
    setNewName(event.target.value)
  }

  const updateNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} on jo luettelossa!`)
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>

      <Filter filter={filter} updateFilter={updateFilter} />

      <h2>Lisää uusi</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        updateNewName={updateNewName}
        newNumber={newNumber}
        updateNewNumber={updateNewNumber}
      />

      <h2>Numerot</h2>

      <Persons persons={persons} filter={filter} />

    </div >
  )

}

export default App
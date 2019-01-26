import React, { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
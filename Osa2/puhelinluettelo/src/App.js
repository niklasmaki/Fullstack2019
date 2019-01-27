import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Person = ({ person, removePerson }) => (
  <div>
    {person.name} {person.number} <button onClick={removePerson}>Poista</button>
  </div>
)

const Persons = ({ persons, filter, removePerson }) => {

  const getPersons = () => (
    persons.filter(
      person => new RegExp(filter, "i").test(person.name)
    ).map(
      person => <Person 
        key={person.id} 
        person={person} 
        removePerson={() => removePerson(person.name, person.id)} 
      />
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
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
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
    personService
      .add({ name: newName, number: newNumber })
      .then(person => {
        setPersons(persons.concat(person))
      })
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (name, id) => {
    if (window.confirm(`Poistetaanko ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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

      <Persons persons={persons} filter={filter} removePerson={removePerson} />

    </div >
  )

}

export default App
import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'

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

const Notification = ({ message }) => {
  if (!message) return null

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (!message) return null

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')
  const [error, setError] = useState('')

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

  const replaceNumber = person => {
    if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
      personService
        .update({ ...person, number: newNumber })
        .then(updatedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
          notify(`Muutettiin henkilön ${person.name} numero`)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          notifyError(error.response.data.error)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      return replaceNumber(existingPerson)
    }
    personService
      .add({ name: newName, number: newNumber })
      .then(person => {
        setPersons(persons.concat(person))
        notify(`Lisättiin ${newName}`)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        notifyError(error.response.data.error)
      })

  }

  const removePerson = (name, id) => {
    if (window.confirm(`Poistetaanko ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          notify(`Poistettiin ${name}`)
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== id))
          notifyError(`Henkilö ${name} oli jo poistettu palvelimelta`)
        })
    }
  }

  const notify = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const notifyError = message => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 5000)
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>

      <Notification message={notification} />
      <ErrorNotification message={error} />

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
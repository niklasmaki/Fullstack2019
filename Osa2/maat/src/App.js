import React, { useState, useEffect } from 'react';
import axios from 'axios'

const CountryEntry = ({ name, handleClick }) => (
  <div>
    {name} <button country={name} onClick={handleClick}>Show</button>
  </div>
)

const LanguageEntry = ({ language }) => (
  <li>{language}</li>
)

const Country = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <div>
      Capital: {country.capital}
    </div>
    <div>
      Population: {country.population}
    </div>
    <h2>Languages</h2>
    <ul>
      {country.languages.map(language => <LanguageEntry key={language.name} language={language.name} />)}
    </ul>
    <img src={country.flag} width='200px' alt='flag' />
  </div>
)

const Countries = ({ countries, searchString, showCountry }) => {

  if (searchString === '') return null

  const showCountries = () => {
    const regexp = new RegExp(searchString, 'i')
    const filteredCountries = countries
      .filter(country => regexp.test(country.name))

    if (filteredCountries.length > 10) {
      return (<div>Too many matches, specify another filter...</div>)
    }
    if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />
    }
    return filteredCountries
      .map(country =>
        <CountryEntry
          key={country.name}
          name={country.name}
          handleClick={showCountry} />
      )
  }

  return (
    <div>
      {showCountries()}
    </div>)
}

const Search = ({ searchString, search }) => (
  <div>
    Find countries: <input value={searchString} onChange={search} />
  </div>
)

const App = () => {

  const [searchString, setSearchString] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const search = event => {
    setSearchString(event.target.value)
  }

  const showCountry = event => {
    setSearchString(event.target.getAttribute('country'))
  }

  return (
    <div>
      <Search searchString={searchString} search={search} />
      <Countries countries={countries} searchString={searchString} showCountry={showCountry} />
    </div>
  )
}

export default App;

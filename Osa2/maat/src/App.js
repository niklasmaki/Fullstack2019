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

const Weather = ({ city }) => {
  const baseUrl = 'https://api.apixu.com/v1/current.json'
  const key = 'XXXXX'
  const queryURL = baseUrl + '?key=' + key + '&q='
  const [weather, setWeather] = useState({})
  useEffect(() => {
    axios
      .get(queryURL + city)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  if (!weather.hasOwnProperty('current')) return null
  return (
    <div>
      <div>
        <b>Temperature:</b> {weather.current.temp_c} Celsius
      </div>
      <div>
        <img src={weather.current.condition.icon} alt="Weather icon" />
      </div>
      <div>
        <b>Wind: </b> {weather.current.wind_kph} kph direction {weather.current.wind_dir}
      </div>
    </div>
  )
}

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
    <h2>Weather in {country.capital}</h2>
    <Weather city={country.capital} />
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

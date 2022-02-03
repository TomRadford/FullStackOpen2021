import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Filter = (props) => (
  <p>find countries <input value={props.countriesFilter} onChange={props.handleFilter} /> </p>
)

const Country = ({ countriesToShow }) => {

  console.log(countriesToShow)

  const countryList = () => (
    <ul>
      {countriesToShow.map(country => {
        <li key={country.name.common}>country.name.common</li>
      })}
      </ul>
  )

  if (countriesToShow.length >= 2 && countriesToShow.length <= 10) 
    {countryList()} 
  if (countriesToShow.length > 10) (<>Too many matches, specify another filter</>)
  else return null
}



const App = () => {

  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState('')
  console.log(countriesFilter)

  const handleFilter = (event) => {
    setCountriesFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
    , [])

  const countriesToShow = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(countriesFilter)
  )

  return (
    <div>
      <Filter countriesFilter={countriesFilter} handleFilter={handleFilter} />
      <Country countriesToShow={countriesToShow} />
    </div>
  )
}
export default App;

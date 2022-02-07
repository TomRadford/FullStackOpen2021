import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Filter = ({ handleFilter }) => (
  <p>find countries <input onChange={handleFilter} /> </p>
)

const Weather = ({ countryDetails }) => {
  const [weatherData, setWeatherData] = useState({})
  const api_key = process.env.REACT_APP_WEATHER_API_KEY
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${countryDetails.capitalInfo.latlng[0]}&lon=${countryDetails.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeatherData(response.data)
      })
  }, [])

  const compass = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

  const degToCompass = (degrees) => {
    const val = Math.floor((degrees / 22.5) + 0.5)
    return compass[(val % 16)]

  }

  if (Object.keys(weatherData).length !== 0) {

    const windDirection = degToCompass(weatherData.wind.deg)
    return (
      <div>
        <p><b>temperature: </b>{weatherData.main.temp} Celcius</p>
        <img style={{ background: '#3d4c92' }} alt="" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
        <p><b>wind: </b>{Math.round(weatherData.wind.speed * 2.23694)} mph direction {windDirection}</p>
      </div>
    )
  } else return null
}

const CountryDisplay = ({ countryDetails }) => {
  const countryLanguages = Object.values(countryDetails.languages)
  return (
    <div>
      <h1>{countryDetails.name.common}</h1>
      <p>capital {countryDetails.capital[0]}</p>
      <p>population {countryDetails.population}</p>
      <h2>Languages</h2>
      <ul>
        {countryLanguages.map(language =>
          <li key={language}>{language}</li>)}
      </ul>
      <img alt=" " src={countryDetails.flags.png} />
      <h2>Weather in {countryDetails.capital[0]}</h2>

      <Weather countryDetails={countryDetails} />

    </div>
  )
}

const CountryList = ({ countriesToShow, countriesFilter, setCountriesFilter }) => {
  if (countriesFilter !== '') {
    if (countriesToShow.length === 1) {
      const countryDetails = countriesToShow[0]
      return (
        <CountryDisplay countryDetails={countryDetails} />
      )
    }
    else if (countriesToShow.length <= 10) {
      return (
        <div>
          <ul>
            {countriesToShow.map(country =>
              <li key={country.name.common}>{country.name.common} <button onClick={() => setCountriesFilter(country.name.common)}>show</button></li>
            )}
          </ul>
        </div>)
    } else if (countriesToShow.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }
  } else return null
}



const App = () => {

  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState('')

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
      .includes(countriesFilter.toLowerCase())
  )

  return (
    <div>
      <Filter countriesFilter={countriesFilter} handleFilter={handleFilter} />
      <CountryList countriesToShow={countriesToShow} countriesFilter={countriesFilter} setCountriesFilter={setCountriesFilter} />
    </div>
  )
}
export default App;

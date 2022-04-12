import axios from 'axios'
import { useEffect, useState } from 'react'

const CountryInfo = ({ country }) => {
  const [weatherLoaded, setWeatherLoaded] = useState(false)
  const [weatherIconUrl, setWeatherIconUrl] = useState('')
  const [temperature, setTemperature] = useState(0)
  const [wind, setWind] = useState(0)

  useEffect(() => {
    axios
      .get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
          q: `${country.capital[0]},${country.cca2}`,
          limit: 1,
          appid: process.env.REACT_APP_API_KEY
        }
      })
      .then(res => {
        axios
          .get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
              lat: res.data[0].lat,
              lon: res.data[0].lon,
              appid: process.env.REACT_APP_API_KEY,
              units: 'metric'
            }
          })
          .then(res => {
            console.log(res.data)
            setTemperature(res.data.main.temp)
            setWind(res.data.wind.speed)
            setWeatherIconUrl(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`)
            setWeatherLoaded(true)
          })
      })
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => 
          <li key={lang}>{lang}</li>
        )}
      </ul>

      <img src={country.flags.png} alt={`${country.name.common} flag`}/>

      {
        weatherLoaded ?
        <>
          <h2>Weather in {country.capital[0]}</h2>
          <p>Temperature {temperature} Celcius</p>
          <img src={weatherIconUrl} alt='Weather icon'/>
          <p>Wind {wind} m/s</p>
        </> 
        :
        <h2>Loading weather...</h2>
      }
    </div>
  )
}

export default CountryInfo
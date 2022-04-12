import { useState, useEffect } from 'react';
import axios from 'axios'

import CountryInfo from './components/CountryInfo';
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [contriesFilter, setCountriesFilter] = useState('')

  const filteredCountries = countries.filter(x => 
    x.name.common.toLowerCase().includes(contriesFilter.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  }, [])

  return (
    <div>
      <Filter 
        label='Find countries:'
        value={contriesFilter}
        onChange={(e) => setCountriesFilter(e.target.value)}
      />

      {
        filteredCountries.length === 0 && 
        <p>No matching country</p>
      }

      {
        filteredCountries.length === 1 &&
        <CountryInfo country={filteredCountries[0]}/>
      }

      {
        filteredCountries.length > 1 && filteredCountries.length <= 10 &&
        filteredCountries.map(country => 
          <div key={country.cca2}>
            <p>{country.name.common}</p>
            <button onClick={() => setCountriesFilter(country.name.common)}>show</button>
          </div>
        )
      }

      {
        filteredCountries.length > 10 &&
        <p>Too many matches, specify another filter</p>
      }

    </div>
  );
}

export default App;

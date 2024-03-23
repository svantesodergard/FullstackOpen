import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const Weather = ({lon, lat}) => {
    const [weather, setWeather] = useState("")
    useEffect(() => { axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`).then(response => {
        setWeather (
            <>
                <div>temperature {Math.round((response.data.main.temp - 273.15) * 10)/10} celsius</div>
                <img src={`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`} alt={response.data.weather[0].description} />
                <div>wind {response.data.wind.speed} m/s</div>
            </>
        )
    })}, [])

    return weather
}

const Country = ({country}) => (
    <>
        <h1>{country.name.common}</h1>

        <div>capital {country.capital.join(', ')}</div>
        <div>area {country.area}</div>

        <h4>languages:</h4>
        <ul>
            {Object.entries(country.languages).map(([code, name]) => <li key={code}>{name}</li>)}
        </ul>

        <img src={country.flags.png} alt={country.flags.alt} />

        <h2>Weather in {country.capital[0]}</h2>
        <Weather lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]} />
    </>
)

const Countries = ({search, countries, setSearch}) => {
    const results = countries.filter(country => country.name.common.toUpperCase().includes(search.toUpperCase()))

    if (results.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if(results.length > 1) {
        return results.map(country =>
            <div key={country.cca2}>{country.name.common}
                <button onClick={() => setSearch(country.name.common)}>show</button>
            </div>)
    }

    if(results.length > 0) {
        return <Country country={results[0]} />
    }

    return null
}

function App() {
    const [search, setSearch] = useState("")
    const [countries, setCountries] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get("https://studies.cs.helsinki.fi/restcountries/api/all")
            .then(response => {
                setCountries(response.data)
            })
    }, [])
    return (
        <>
            find countries <input onChange={ e => setSearch(e.target.value)} />
            <Countries search={search} countries={countries} setSearch={setSearch} />
        </>
    )
}

export default App

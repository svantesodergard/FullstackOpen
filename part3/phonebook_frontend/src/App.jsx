import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Filter = ({handleChange}) => (
  <form onSubmit={e => e.preventDefault()}>
    filter shown with<input onChange={e => handleChange(e.target.value)} />
  </form>
)

const PersonForm = ({handleSubmit, handleNameChange, handleNumberChange}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input onChange={e => handleNameChange(e.target.value)} />
    </div>
    <div>
      number: <input onChange={e => handleNumberChange(e.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({persons, search, handleDelete}) => {
  const removePerson = id => personService.remove(id)
    .then((res) => 
      handleDelete(persons.filter(p => p.id !== res.data.id))
    )

  return persons.filter(p => p.name.toUpperCase().includes(search.toUpperCase())).map(p =>
    <div key={p.id}>
      {p.name} {p.number}
      <button onClick={() => confirm(`Delete ${p.name} ?`) ? removePerson(p.id) : null}>delete</button>
    </div>
  )
}
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={type}>
        {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const updatePerson = (person) => {
    personService.update(person.id, person)
      .then(response => 
        setPersons(persons.map(p => p.id === response.data.id ? response.data : p))
      ).catch(() => {
        setMessageType("error")
        setMessage(`Information of ${person.name} has already been removed from the server`) 
        setTimeout(() => {setMessage(null)}, 3000)
      })

  }

  const newContact = (event) => {
    event.preventDefault()

    if (persons.map(p => p.name).includes(newName)) {
      return confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        ? updatePerson({ ...persons.find(p => p.name === newName), number: newNumber}) : null
    }

    if (persons.map(p => p.number).includes(newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    const newPerson = {name: newName, number: newNumber}
    personService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setMessageType("success") 
        setMessage(`Added ${response.data.name}`)
        setTimeout(() => {setMessage(null)}, 3000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} type={messageType} />

      <Filter handleChange={setSearch} />

      <h3>add a new</h3>

      <PersonForm handleSubmit={newContact} handleNameChange={setNewName} handleNumberChange={setNewNumber}/>
      <h3>Numbers</h3>

      <Persons persons={persons} search={search} handleDelete={setPersons} />

    </div>
  )
}

export default App

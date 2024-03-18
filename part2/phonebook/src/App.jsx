import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'040 1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const newContact = (event) => {
    event.preventDefault()

    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    if (persons.map(p => p.number).includes(newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    setPersons(
      persons.concat({name: newName, number: newNumber})
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={newContact}>
        <div>
          name: <input onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input onChange={e => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => <div>{p.name} {p.number}</div>)}

    </div>
  )
}

export default App

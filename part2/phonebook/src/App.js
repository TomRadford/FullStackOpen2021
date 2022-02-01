import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ personsFilter, handleFilter }) => (
  <p>filter shown with <input value={personsFilter} onChange={handleFilter} /> </p>
)

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
      <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
      <button type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [personsFilter, setPersonsFilter] = useState('')

  useEffect(() =>
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
    , [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
      setPersons(persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setPersonsFilter(event.target.value)
  }

  const personsToShow = (personsFilter.length > 0)
    ? persons.filter(person => person.name
      .toLowerCase()
      .includes(personsFilter.toLowerCase()))
    : persons


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter personsFilter={personsFilter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.id}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import personService from './services/persons'

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

const Notification = ({ notificationMessage, setNotificationMessage }) => {
  if (notificationMessage === null) {
    return null
  }

  setTimeout(() => {
    setNotificationMessage(null)
  }, 5000)

  const notificationColor = {
    color: notificationMessage.color
  }

  return (
    <div className="notification" style={notificationColor}>
      {notificationMessage.message}
    </div>
  )



}


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [personsFilter, setPersonsFilter] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() =>
    personService
      .getAll()
      .then(initalPersons => {
        setPersons(initalPersons)
      })
    , [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          name: newName,
          number: newNumber,
          id: persons.find(person => person.name === newName).id
        }
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedData => {
            setPersons(persons.map(person =>
              person.id !== updatedPerson.id
                ? person
                : returnedData
            ))
            setNotificationMessage({
              message: `Updated ${updatedPerson.name}`,
              color: 'green'
            })
          })
          .catch(error => {
            setNotificationMessage({
              message: error.response.data.error,
              color: 'red'
            })
          })
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationMessage({
            message: `Added ${newPerson.name}`,
            color: 'green'
          })
        })
        .catch(error => {
          setNotificationMessage({
            message: error.response.data.error,
            color: 'red'
          })
        })



    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => setPersons(
          persons.filter(person =>
            person.id !== id
          )
        ))
        .catch((error) => {
          setNotificationMessage({
            message: `Information of ${name} has already been removed from server`,
            color: 'red'
          })
          setPersons(
            persons.filter(person => person.id !== id)
          )

        })
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
      <Notification notificationMessage={notificationMessage} setNotificationMessage={setNotificationMessage} />
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
          <li key={person.id}>
            {person.name} {person.number} <button onClick={
              () => deletePerson(person.id, person.name)
            }>
              delete
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [filterText, setFilterText] = useState('')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isSuccessNotification, setIsSuccessNotification] = useState(true)

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const regexFilter = new RegExp(filterText, 'i') // 'i' flag stands for insensitive case
  const visiblePersons = persons.filter(person => {
    // return person.name.toUpperCase()
    //   .includes(filterText.toUpperCase())
    return regexFilter.test(person.name)
  })
  
  const HandleSubmit = (e) => {
    e.preventDefault()

    const person = persons.find(x => x.name.toLowerCase() === newName.toLowerCase())    
    if(!person){
      CreatePerson()
      return
    }
    
    if(window.confirm(`${newName} is already added to phonebook, ` +
    'replace the old number with a new one?'))
      UpdateNumber(person)
  }

  const CreatePerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(newPerson)
      .then(inserted => {
        setPersons([...persons, inserted])
        setNewName('')
        setNewNumber('')
        ShowMessage(`${inserted.name} was inserted`, true)
      })
  }

  const UpdateNumber = (person) => {
    const updatedPerson = {
      ...person,
      number: newNumber
    }

    personsService
      .update(updatedPerson.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => 
          person.id !== returnedPerson.id ? person : returnedPerson))
        
        ShowMessage(`The number from ${returnedPerson.name} was updated`, true)
      })
      .catch(err => {
        ShowMessage(`The number from ${person.name} could not be updated`, false)
      })
  }

  const HandleDelete = (person) => {
    if(!window.confirm(`Delete ${person.name}?`)) return

    personsService
      .deleteOne(person.id)
      .then(setPersons(persons.filter(x => 
          x.id !== person.id)))
  }

  const ShowMessage = (message, isSuccess) => {
    setIsSuccessNotification(isSuccess)
    setNotificationMessage(message)
    setTimeout(() => setNotificationMessage(null), 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} isSuccess={isSuccessNotification}/>

      <Filter 
        label='Filter shown with:'
        value={filterText}
        handleChange={(e) => setFilterText(e.target.value)}
      />
      
      <h3>New register</h3>
      <PersonForm 
        HandleSubmit={HandleSubmit}
        nameValue={newName}
        HandleNameChange={e => setNewName(e.target.value)}
        numberValue={newNumber}
        HandleNumberChange={e => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons={visiblePersons} handleDelete={HandleDelete}/>
    </div>
  )
}

export default App
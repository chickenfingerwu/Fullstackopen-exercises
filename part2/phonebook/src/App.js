import React, {useState, useEffect} from 'react';
import Number from './components/Number'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Display from './components/Display'
import Notification from './components/Notification'
import Error from './components/Error'
import phonesService from './services/numbers'

const App = () => {
  const [person, setPerson] = useState([])
  const [personsToShow, setToShow] = useState(person)
  const [newName, setName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [formNameInput, setFormNameInput] = useState({})
  const [formNumberInput, setFormNumberInput] = useState({})
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phonesService
      .getAll()
      .then(initialPhones => {
          setPerson(initialPhones)
          setToShow(initialPhones)
        })
  }
  ,[])

  const handleFilter = (event) => {
    const token = event.target.value
    setToShow(person.filter(p => p.name.toLowerCase().includes(token.toLowerCase())))
  }

  const handleNameChange = (event) => {
    setFormNameInput({
      fullName: event.target,
    })
    setName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setFormNumberInput({
      number: event.target,
    })
    setNumber(event.target.value)
  }

  const updateNumber = (id, object) =>
    phonesService.update(id, object)


  const addNumber = (event) => {
    event.preventDefault()

    const findObjectValue = person.find(p => p.name === newName)
    if(typeof findObjectValue !== 'undefined') {
      const result = window.confirm(newName + 'already existed, replace the old number with new one?')
      if(result){
        const newObject = {
          name: newName,
          number: newNumber
        }

        updateNumber(findObjectValue.id, newObject)
          .catch(error => {
            setErrorMessage(`${findObjectValue.name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
    else if (newName === '') {
      window.alert('pls add a name')
    }
    else if(newNumber === '') {
      window.alert('pls add a number')
    }
    else {
      const newObject = {
        name: newName,
        number: newNumber
      }

      phonesService.create(newObject)
      setPerson(person.concat(newObject))
      setToShow(person.concat(newObject))
      setName('')
      setNumber('')
      formNumberInput["number"].value = ''
      formNameInput["fullName"].value = ''
      setFormNameInput({})
      setFormNumberInput({})
      setMessage(`${newName} has been added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const rows = () => personsToShow.map(p => <Number key = {p.name} name={p.name} number={p.number} title="delete" deleteOnClick={() => deleteNumber(p.id)}/>)

  const deleteNumber = id => {
    const object = person.find(p => p.id === id)
    const result = window.confirm("Are you sure you want to delete " + object.name)
    if(result){
      phonesService.del(id)
      const newArray = person.filter(p => p.id !== object.id)
      setPerson(newArray)
      setToShow(newArray)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilter}/>
      <Notification message={message}/>
      <Error message={errorMessage}/>
      <h2>add new</h2>
      <PersonForm  addNumber={addNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Display rows={rows} buttonOnClick={deleteNumber}/>
    </div>
  )

}

export default App;

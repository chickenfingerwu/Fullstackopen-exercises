import React, {useState} from 'react';
import Number from './Number'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Display from './Display'

const App = () => {
  const [person, setPerson] = useState([
    {name: 'Pham Thai Son', number: '0397778531',},
    {name: 'Pham Tien Dat', number: '0397778531',},
    {name: 'Pham Tuan Tu', number: '0397778531',},
    {name: 'Bill gate', number: '0397778531',},
    {name: 'Sth', number: '0397778531',},
  ])
  const [personsToShow, setToShow] = useState(person)
  const [newName, setName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [formNameInput, setFormNameInput] = useState({})
  const [formNumberInput, setFormNumberInput] = useState({})

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

  const addNumber = (event) => {
    event.preventDefault()

    const findObjectValue = person.find(p => p.name === newName)

    if(typeof findObjectValue !== 'undefined') {
      window.alert(newName + 'already existed')
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
      setPerson(person.concat(newObject))
      setName('')
      setNumber('')
      formNumberInput["number"].value = ''
      formNameInput["fullName"].value = ''
      setFormNameInput({})
      setFormNumberInput({})
    }
  }

  const rows = () => personsToShow.map(p => <Number key = {p.name} name={p.name} number={p.number}/>)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilter}/>
      <h2>add new</h2>
      <PersonForm  addNumber={addNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Display rows={rows}/>
    </div>
  )

}

export default App;

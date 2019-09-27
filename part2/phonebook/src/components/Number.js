import React from 'react'
import Button from './Button'

const Number = (props) => <div>
  {props.name} {props.number} <Button title={props.title} onClick={props.deleteOnClick}/>
  </div>

export default Number

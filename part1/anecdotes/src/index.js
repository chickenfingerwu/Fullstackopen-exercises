import React,{useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Header = (props) => {
  return (
    <h2>{props.text}</h2>
  )
}

const MostVote = (props) => {
  return (
    <div>
      {props.text}
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(Array.apply(null, new Array(anecdotes.length)).map(() => 0))

  const generateAnecdotes = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 0)))
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoint(copy)
  }

  const findMaxIndex = (array) => {
    if(array.length === 0){
      return -1
    }

    let maxIndex = 0
    let max = array[0]
    array.forEach((value, index) => {
      if(value > max){
        max = value
        maxIndex = index
      }
    })

    return maxIndex
  }

  return (
    <div>
      <Header text='Anecdotes of the day'/><br/>
      {props.anecdotes[selected]} has {points[selected]} votes<br/>
      <Button text='next anecdotes' onClick={generateAnecdotes} />
      <Button text='vote' onClick={voteAnecdote} /><br/>
      <Header text='Anecdotes with most votes'/><br/>
      <MostVote text={anecdotes[findMaxIndex(points)]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

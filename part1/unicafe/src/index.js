import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Title = (props) => {
  return (
    <h2>{props.title}</h2>
  )
}

const Button = (props) => {

  return (
    <button onClick={props.onClick}>{props.name}</button>
  )
}

const Statistics = (props) => {
  const {goodVotes, neutralVotes, badVotes, allVotes, averageVotes, positivePercentage} = props

  if(allVotes === 0){
    return(
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{goodVotes}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutralVotes}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{badVotes}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{allVotes}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{averageVotes}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{positivePercentage}</td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {

  const [goodVote, setGood] = useState(0)
  const [badVote, setBad] = useState(0)
  const [neutralVote, setNeutral] = useState(0)

  const voteGood = () => setGood(goodVote + 1)
  const voteBad = () => setBad(badVote + 1)
  const voteNeutral = () => setNeutral(neutralVote + 1)

  let all = badVote + goodVote + neutralVote
  let positivePercentage = all === 0 ? 0 : (goodVote/all) * 100

  return (
    <div>
      <Title title='give feedback' />
      <Button name='good' onClick={voteGood} />
      <Button name='neutral' onClick={voteNeutral} />
      <Button name='bad' onClick={voteBad} />
      <Title title='statistic' />
      <Statistics goodVotes={goodVote} neutralVotes={neutralVote}
      badVotes={badVote} allVotes={all} averageVotes={(goodVote - badVote)/10}
      positivePercentage={positivePercentage + "%"} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

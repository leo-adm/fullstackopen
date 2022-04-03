import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  function GetMostVotedIndex() {
    if(anecdotes.length < 1)
      return -1

    let index = 0
    let indexVotes = votes[0]

    for(let i = 1; i < anecdotes.length; i++) {
      if(votes[i] > indexVotes) {
        index = i
        indexVotes = votes[i]
      }
    }

    return index
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNextAnecdote}>Next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[GetMostVotedIndex()]}</p>
      <p>Has {votes[GetMostVotedIndex()]} votes</p>
    </div>
  )
}

export default App
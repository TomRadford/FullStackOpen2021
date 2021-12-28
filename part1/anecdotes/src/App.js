import React, { useState } from 'react'

const MostVotes = ({ anecdotes, mostVotes }) => {
  if (mostVotes.vote < 0) return (
    <p>There are no votes yet</p>
  )

  return (
    <>
      <p>{anecdotes[mostVotes.vote]}
        <br></br>
        has {mostVotes.amount} votes
      </p>
    </>
  )
}

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
  const nextAnecdote = () => {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * (max))
    }
    setSelected(getRandomInt(anecdotes.length))
  }

  const [mostVotes, setMostVotes] = useState({ vote: -1, amount: 0 })

  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))
  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    if (copy[selected] > mostVotes.amount) {
      const copyMostVotes = { amount: copy[selected], vote: selected }
      setMostVotes(copyMostVotes)
    }
    setVote(copy)
  }



  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}
        <br></br>
        has {votes[selected]} votes
      </p>
      <button onClick={vote}>Vote</button>
      <button onClick={nextAnecdote}>Next Anecdote </button>
      <h1>Anecdote with the most votes</h1>
      <MostVotes anecdotes={anecdotes} mostVotes={mostVotes} />

    </div>
  )

}

export default App;

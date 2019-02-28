import React from 'react';
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()
  

  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch(voteAnecdote(id))
  }

  const add = event => {
    event.preventDefault()
    props.store.dispatch(addAnecdote(event.target.anecdote.value))
  }

  const sortByVotes = (a, b) => {
    return b.votes - a.votes
  }

  const getSortedAnecdotes = () => {
    return [...anecdotes].sort(sortByVotes)
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {getSortedAnecdotes().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App

import React from 'react';
import { voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = (props) => {
  const anecdotes = props.store.getState()
  

  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch(voteAnecdote(id))
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
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App

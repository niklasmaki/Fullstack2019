import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const anecdotes = props.store.getState().anecdotes
  const filter = props.store.getState().filter

  const vote = (id) => {
    console.log('vote', id)
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    props.store.dispatch(voteAnecdote(id))
    props.store.dispatch(showNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => {
      props.store.dispatch(hideNotification())
    }, 5000)
  }

  const sortByVotes = (a, b) => {
    return b.votes - a.votes
  }

  return (
    <div>
      {anecdotes
        .filter(anecdote => anecdote.content.includes(filter))
        .sort(sortByVotes)
        .map(anecdote =>
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
    </div>
  )
}

export default AnecdoteList
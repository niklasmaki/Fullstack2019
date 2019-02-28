import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {

  const add = event => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    props.store.dispatch(addAnecdote(anecdote))
    props.store.dispatch(showNotification(`You added '${anecdote}'`))
    setTimeout(() => {
      props.store.dispatch(hideNotification()) 
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
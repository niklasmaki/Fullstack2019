import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {

  const add = event => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    props.addAnecdote(anecdote)
    event.target.anecdote.value = ''
    props.showNotification(`You added '${anecdote}'`)
    setTimeout(() => {
      props.hideNotification()
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

export default connect(
  null,
  { addAnecdote, showNotification, hideNotification }
)(AnecdoteForm)
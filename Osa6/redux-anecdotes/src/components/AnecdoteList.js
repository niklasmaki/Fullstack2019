import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const anecdotes = props.anecdotes

  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    props.voteAnecdote(id)
    props.showNotification(`You voted '${anecdote.content}'`)
    setTimeout(() => {
      props.hideNotification()
    }, 5000)
  }

  return (
    <div>
      {anecdotes
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

const sortByVotes = (a, b) => {
  return b.votes - a.votes
}

const getAnecdotes = state => {
  return state.anecdotes
    .filter(anecdote => anecdote.content.includes(state.filter))
    .sort(sortByVotes)
}

const mapStateToProps = state => {
  return {
    anecdotes: getAnecdotes(state)
  }
}

export default connect(
  mapStateToProps,
  { voteAnecdote, showNotification, hideNotification }
)(AnecdoteList)
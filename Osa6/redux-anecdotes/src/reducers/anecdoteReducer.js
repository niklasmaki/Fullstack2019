import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ANECDOTE_VOTE':
      return state.map(anecdote => {
        if (anecdote.id === action.data.id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      })
    case 'ANECDOTE_ADD':
      return state.concat(action.data)
    case 'ANECDOTE_INIT':
      return action.data
    default:
      return state
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "ANECDOTE_INIT",
      data: anecdotes
    })
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch({
      type: "ANECDOTE_VOTE",
      data: {
        id
      }
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: "ANECDOTE_ADD",
      data: newAnecdote
    })
  }
}

export default reducer
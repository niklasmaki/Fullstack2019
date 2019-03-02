import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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
      return state.concat(asObject(action.data.content))
    case 'ANECDOTE_INIT':
      return action.data
    default:
      return state
  }
}

export const initAnecdotes = anecdotes => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "ANECDOTE_INIT",
      data: anecdotes
    })
  }
}

export const voteAnecdote = id => {
  return {
    type: "ANECDOTE_VOTE",
    data: {
      id
    }
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
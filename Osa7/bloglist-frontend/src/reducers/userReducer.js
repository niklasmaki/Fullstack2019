import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.data
    case 'USER_LOGOUT':
      return null
    default:
      return state
  }
}

export const initUser = user => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'USER_LOGIN',
      data: user
    })
  }
}

export const loginUser = (username, password, handleError) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch({
        type: 'USER_LOGIN',
        data: user
      })
    } catch (exception) {
      handleError()
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')
    dispatch({
      type: 'USER_LOGOUT',
    })
  }
}

export default reducer
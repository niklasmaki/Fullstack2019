

export const setNotification = (message, seconds, type) => {
  return async dispatch => {
    dispatch(showNotification({
      message,
      type
    }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)
  }
}

const showNotification = notification => {
  return {
    type: 'NOTIFICATION_SHOW',
    notification
  }
}

const hideNotification = () => {
  return {
    type: 'NOTIFICATION_HIDE'
  }
}

const emptyNotification = {
  message: null
}

const reducer = (state = emptyNotification, action) => {
  switch (action.type) {
    case 'NOTIFICATION_SHOW':
      return action.notification
    case 'NOTIFICATION_HIDE':
      return emptyNotification
    default:
      return state
  }
}

export default reducer
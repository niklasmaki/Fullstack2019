

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time)
  }
}

const showNotification = message => {
  return {
    type: 'NOTIFICATION_SHOW',
    notification: message
  }
}

const hideNotification = () => {
  return {
    type: 'NOTIFICATION_HIDE'
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION_SHOW':
      return action.notification
    case 'NOTIFICATION_HIDE':
      return ''
    default:
      return state
  }
}

export default reducer


export const showNotification = message => {
  return {
    type: 'NOTIFICATION_SHOW',
    notification: message
  }
}

const reducer = (state = 'test', action) => {
  switch(action) {
    case 'NOTIFICATION_SHOW':
      return action.notification
    default:
      return state
  }
}

export default reducer
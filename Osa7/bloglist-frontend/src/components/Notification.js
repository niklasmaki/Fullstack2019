import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  const variant = notification.type === 'error' ? 'danger' : 'success'
  return (
    <Alert variant={variant} >
      {notification.message}
    </Alert>
  )
}

export default Notification
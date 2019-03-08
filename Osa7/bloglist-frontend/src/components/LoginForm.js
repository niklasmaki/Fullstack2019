import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const getFieldWithoutReset = field => {
  const { reset, ...result } = field
  return result
}

const LoginForm = props => {
  const username = getFieldWithoutReset(props.username)
  const password = getFieldWithoutReset(props.password)

  return (
    <div>
      <Form onSubmit={props.handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control id='username' {...username} />
          <Form.Label>Password:</Form.Label>
          <Form.Control id='password' {...password} />
          <Button variant="primary" type="submit" id='loginButton'
            style={{ marginTop: '10px' }}>
            Log in
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm
import React from 'react'
import PropTypes from 'prop-types'

const getFieldWithoutReset = field => {
  const { reset, ...result } = field
  return result
}

const LoginForm = props => {
  const username = getFieldWithoutReset(props.username)
  const password = getFieldWithoutReset(props.password)

  return (
    <div>
      <form onSubmit={props.handleLogin}>
        <div>
          Username:
          <input {...username} />
        </div>
        <div>
          Password:
          <input {...password} />
        </div>
        <button
          type="submit">
          Log in
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm
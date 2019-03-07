import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import useField from './hooks/index'
import { setNotification } from './reducers/notificationReducer'
import { loginUser, logoutUser, initUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import BlogList from './components/BlogList'
import UserList from './components/UserList'

const App = props => {
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      props.initUser(JSON.parse(loggedInUser))
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    const handleError = () => {
      props.setNotification('Wrong username or password', 5, 'error')
    }
    props.loginUser(username.value, password.value, handleError)

    username.reset()
    password.reset()
  }

  if (!props.user) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification notification={props.notification} />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={props.notification} />
      <p>{props.user.name} logged in</p>
      <div>
        <button onClick={props.logoutUser}>
          Logout
        </button>
      </div>
      <Router>
        <div>
          <Route exact path='/' render={() => <BlogList />} />
          <Route path='/users' render={() => <UserList />} />
        </div>
      </Router>
    </div >
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {
    setNotification, loginUser, logoutUser, initUser
  }
)(App)
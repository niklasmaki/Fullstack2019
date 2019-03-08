import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import useField from './hooks/index'
import { setNotification } from './reducers/notificationReducer'
import { loginUser, logoutUser, initUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import BlogInfo from './components/BlogInfo'
import { Nav, Navbar, Button } from 'react-bootstrap'

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
      <div className='container'>
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
    <Router>
      <div className='container'>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link to="/blogs">Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users">Users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <em>{props.user.name} logged in</em>

              </Nav.Link>
              <Nav.Link>
                <Button variant='light' size='sm'
                  onClick={props.logoutUser}>
                  Logout
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Notification notification={props.notification} />
        <Route exact path='/' render={() => <BlogList />} />
        <Route exact path='/blogs' render={() => <BlogList />} />
        <Route exact path='/users' render={() => <UserList />} />
        <Route path='/users/:id' component={User} />
        <Route path='/blogs/:id' component={BlogInfo} />
      </div>
    </Router>
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
import React from 'react'
import { render,  waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('renders the login page if the user is not logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('Log in')
    )

    expect(component.container).toHaveTextContent('Username:')
    expect(component.container).toHaveTextContent('Password:')
    expect(component.container).toHaveTextContent('Log in')
    expect(component.container).not.toHaveTextContent('React patterns')
    expect(component.container).not.toHaveTextContent('Go To Statement Considered Harmful')
    expect(component.container).not.toHaveTextContent('Canonical string reduction')
  })

  test('renders the blogs if the user is logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }
    localStorage.setItem('loggedInUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('Blogs')
    )

    expect(component.container).toHaveTextContent('React patterns')
    expect(component.container).toHaveTextContent('Go To Statement Considered Harmful')
    expect(component.container).toHaveTextContent('Canonical string reduction')
  })
})
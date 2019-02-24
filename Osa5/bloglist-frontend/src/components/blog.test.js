import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('Blog element', () => {
  const blog = {
    title: 'Best blog',
    author: 'Niklas M',
    url: 'www.blog.com',
    likes: 14,
    user: {
      username: 'niklas',
      name: 'Niklas M',
      id: '121231sfa14zsdddsfeqwe'
    }
  }

  const user = {
    token: 'asdfghjkl1234456',
    name: 'Niklas M',
    username: 'niklas'
  }

  let handleLike
  let handleRemove
  let component

  beforeEach(() => {
    handleLike = jest.fn()
    handleRemove = jest.fn()
    component = render(<Blog
      blog={blog}
      handleLike={handleLike}
      handleRemove={handleRemove}
      loggedInUser={user}
    />)
  })

  test('renders initial content', () => {
    expect(component.container).toHaveTextContent('Best blog Niklas M')
    expect(component.container).not.toHaveTextContent('www.blog.com')
    expect(component.container).not.toHaveTextContent('14 likes')
    expect(component.container).not.toHaveTextContent('Added by Niklas M')
  })

  test('renders all content after clicking the blog title', () => {
    const title = component.container.querySelector('.title')
    fireEvent.click(title)
    expect(component.container).toHaveTextContent('Best blog Niklas M')
    expect(component.container).toHaveTextContent('www.blog.com')
    expect(component.container).toHaveTextContent('14 likes')
    expect(component.container).toHaveTextContent('Added by Niklas M')
    expect(component.container).toHaveTextContent('Like')
  })
})


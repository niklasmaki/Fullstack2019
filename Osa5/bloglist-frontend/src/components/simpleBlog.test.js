import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Best blog',
    author: 'Niklas M',
    url: 'www.blog.com',
    likes: 14
  }

  const handleLike = jest.fn()
  const component = render(
    <SimpleBlog blog={blog} onClick={handleLike} />
  )

  expect(component.container).toHaveTextContent('Best blog')
  expect(component.container).toHaveTextContent('Niklas M')
  expect(component.container).toHaveTextContent('blog has 14 likes')
})

test('handles likes properly', async () => {
  const blog = {
    title: 'Best blog',
    author: 'Niklas M',
    url: 'www.blog.com',
    likes: 14
  }

  const handleLike = jest.fn()
  const component = render(
    <SimpleBlog blog={blog} onClick={handleLike} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(handleLike.mock.calls.length).toBe(2)
})
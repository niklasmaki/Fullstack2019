import React from 'react'
import { render } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

test('renders content', async () => {
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
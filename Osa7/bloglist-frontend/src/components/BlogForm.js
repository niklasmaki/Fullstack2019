import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const getFieldWithoutReset = field => {
  const { reset, ...result } = field
  return result
}

const BlogForm = props => {
  const title = getFieldWithoutReset(props.title)
  const author = getFieldWithoutReset(props.author)
  const url = getFieldWithoutReset(props.url)
  return (
    <Form onSubmit={props.handleNewBlog}>
      <Form.Group>
        <Form.Label>Title:</Form.Label>

        <Form.Control id='title' {...title} />
        <Form.Label>Author:</Form.Label>
        <Form.Control id='author' {...author} />
        <Form.Label>URL:</Form.Label>
        <Form.Control id='url' {...url} />
        <Button variant="primary" type="submit" id='addBlog'
          style={{ marginTop: '10px' }}>
          Add
        </Button>
      </Form.Group>
    </Form>
  )
}

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default BlogForm
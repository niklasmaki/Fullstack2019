import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      bookCount
      born
      name
    }
  }
`

export const ALL_BOOKS = gql`
  query AllAuthors {
    allBooks {
      author
      published
      title
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation Mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      author
      genres
      published
      title
    }
  }
`
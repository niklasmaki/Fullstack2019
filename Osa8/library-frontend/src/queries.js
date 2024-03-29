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
  query AllAuthors($genre: String) {
    allBooks(genre: $genre) {
      author {
        name
      }
      published
      title
      genres
    }
  }
`

export const FAVOURITE_GENRE = gql`
  query FavouriteGenre {
    me {
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation Mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      author {
        name
      }
      genres
      published
      title
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
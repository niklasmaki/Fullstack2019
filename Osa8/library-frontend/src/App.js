import { useState, useReducer } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, FAVOURITE_GENRE } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [_, forceUpdate] = useReducer((x) => x + 1, 0); // couldn't get the Authors component to rerender on mutation so I need to force it...
  const client = useApolloClient()

  const authorResult = useQuery(ALL_AUTHORS, { fetchPolicy: 'network-only' })
  const bookResult = useQuery(ALL_BOOKS)
  const genreResult = useQuery(FAVOURITE_GENRE)

  if (authorResult.loading || bookResult.loading || genreResult.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore() 
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('recommendations')}>recommend</button> : null }
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? <button onClick={logout}>logout</button>
          :<button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} authors={authorResult.data.allAuthors} forceUpdate={forceUpdate}/>

      <Books show={page === 'books'} books={bookResult.data.allBooks} />

      <NewBook show={page === 'add'} />
      
      <Recommendations show={page === 'recommendations'} books={bookResult.data.allBooks} genre={genreResult.data.me.favoriteGenre} />

      <Login show={page === 'login'} setToken={setToken} />
    </div>
  )
}

export default App

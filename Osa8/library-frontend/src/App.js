import { useState, useReducer } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [_, forceUpdate] = useReducer((x) => x + 1, 0); // couldn't get the Authors component to rerender on mutation so I need to force it...

  const authorResult = useQuery(ALL_AUTHORS, { fetchPolicy: 'network-only' })
  const bookResult = useQuery(ALL_BOOKS)

  if (authorResult.loading || bookResult.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authorResult.data.allAuthors} forceUpdate={forceUpdate}/>

      <Books show={page === 'books'} books={bookResult.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 12,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 2,
          id: 1
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 2
        },
        {
          name: 'Muuta',
          exercises: 27,
          id: 3
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Opetusohjelma</h1>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
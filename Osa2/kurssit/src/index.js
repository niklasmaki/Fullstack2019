import React from 'react'
import ReactDOM from 'react-dom'

const Header = props =>
    <h1>{props.course}</h1>

const Total = props => {
    const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

    return <p>yhteensä {total} tehtävää</p>
}


const Part = props =>
    <p>{props.part.name} {props.part.exercises}</p>


const Content = ({ parts }) => (
    <div>
        {parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
)

const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        {/* <Total parts={course.parts} /> */}
    </div>
)

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
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
                exercises: 14,
                id: 3
            },
            {
                name: 'Node.js perusteet',
                exercises: 999,
                id: 4
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
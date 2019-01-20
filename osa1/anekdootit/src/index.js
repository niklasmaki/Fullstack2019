import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (
    <h1>{text}</h1>
)

const Button = ({ handleClick, text }) => (
    <div>
        <button onClick={handleClick}>{text}</button>
    </div>
)

const Votes = ({votes}) => (
    <div>Has {votes} votes</div>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

    const selectRandom = () => {
        const randomIndex = Math.floor(Math.random() * props.anecdotes.length)
        setSelected(randomIndex)
    }

    const vote = (index) => () => {
        const votesCopy = [...votes]
        votesCopy[index]++
        setVotes(votesCopy)
    } 

    const mostVotes = Math.max(...votes)
    const indexOfMostVoted = votes.indexOf(mostVotes)

    return (
        <div>
            <Header text="Anecdote of the day" />
            {props.anecdotes[selected]}
            <Votes votes={votes[selected]} />
            <Button handleClick={vote(selected)} text="Vote" />
            <Button handleClick={selectRandom} text="Next anecdote" />
            <Header text="Anecdote with most votes" />
            {props.anecdotes[indexOfMostVoted]}
            <Votes votes={votes[indexOfMostVoted]} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
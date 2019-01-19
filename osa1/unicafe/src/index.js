import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => (
    <div>
        <h1>UNICAFE</h1>
        <h2>Palautesovellus</h2>
    </div>
)

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const Options = ({ good, neutral, bad }) => (
    <div>
        <Button handleClick={good.handleClick} text={good.text} />
        <Button handleClick={neutral.handleClick} text={neutral.text} />
        <Button handleClick={bad.handleClick} text={bad.text} />
    </div>
)

const StatisticsPart = ({ text, value }) => (
    <div>
        <p>{text} {value}</p>
    </div>
)

const Statistics = ({ header, good, neutral, bad }) => (
    <div>
        <h2>{header}</h2>
        <StatisticsPart text={good.text} value={good.value} />
        <StatisticsPart text={neutral.text} value={neutral.value} />
        <StatisticsPart text={bad.text} value={bad.value} />
    </div>
)

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const increaseByOne = (value, setValue) => () => (
        setValue(value + 1)
    )

    const goodOption = {
        value: good,
        handleClick: increaseByOne(good, setGood),
        text: "Hyvä"
    }
    const neutralOption = {
        value: neutral,
        handleClick: increaseByOne(neutral, setNeutral),
        text: "Neutraali"
    }
    const badOption = {
        value: bad,
        handleClick: increaseByOne(bad, setBad),
        text: "Huono"
    }

    return (
        <div>
            <Header />
            <Options 
                good={goodOption} neutral={neutralOption} bad={badOption} />
            <Statistics
                header="Statistiikka" 
                good={goodOption} neutral={neutralOption} bad={badOption} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
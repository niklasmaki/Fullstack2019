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

const Average = ({ goodValue, neutralValue, badValue }) => {
    const average = (goodValue * 1 + neutralValue * 0 + badValue * -1)
        / (goodValue + neutralValue + badValue)

    return <Statistic text="Keskiarvo" value={average} />
}

const Positive = ({ goodValue, neutralValue, badValue }) => {
    const positive = goodValue / (goodValue + neutralValue + badValue) * 100 + ' %'

    return <Statistic text="Positiivisia" value={positive} />
}

const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const StatisticsContent = ({ good, neutral, bad }) => {
    let content = <div>Ei yhtään palautetta annettu</div>
    if (good.value > 0 || neutral.value > 0 || bad.value > 0)
        content = (
            <table>
                <tbody>
                    <Statistic text={good.text} value={good.value} />
                    <Statistic text={neutral.text} value={neutral.value} />
                    <Statistic text={bad.text} value={bad.value} />
                    <Average goodValue={good.value} neutralValue={neutral.value} badValue={bad.value} />
                    <Positive goodValue={good.value} neutralValue={neutral.value} badValue={bad.value} />
                </tbody>
            </table>
        )
    return content
}

const Statistics = ({ good, neutral, bad }) => (
    <div>
        <h2>Statistiikka</h2>
        <StatisticsContent good={good} neutral={neutral} bad={bad} />
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
            <Options good={goodOption} neutral={neutralOption} bad={badOption} />
            <Statistics good={goodOption} neutral={neutralOption} bad={badOption} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
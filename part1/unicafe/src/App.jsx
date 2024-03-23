import { useState } from 'react'

const StatisticsLine = ({text, value}) => (
    <tr>
        <td>{text}</td> 
        <td>{value}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    const statistics = all === 0 
    ? <div>No feedback given</div>
    : <table>
        <tbody>        
                <StatisticsLine text="good" value={good} />
                <StatisticsLine text="neutral" value={neutral} />
                <StatisticsLine text="bad" value={bad} />
                <StatisticsLine text="all" value={all} />
                <StatisticsLine text="avarage" value={(good - bad)/all}  />
                <StatisticsLine text="positive" value={`${good/all*100} %`} />
        </tbody>
    </table>

    return <>
        <h1>Statistics</h1>
        {statistics}
    </>
}

const Button = ({handleClick, text}) => (
    <button onClick={() => handleClick()}>{text}</button>
)

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <>
            <h1>give feedback</h1>
            <Button text="good" handleClick={() => setGood(good + 1)} />
            <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
            <Button text="bad" handleClick={() => setBad(bad + 1)} />

            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

export default App

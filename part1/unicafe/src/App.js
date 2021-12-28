import React, { useState } from 'react'

const Button = ( {handleClick, text} ) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticsLine = ( {text, value} ) => {
  return (
   <tr>
   <td>{text}</td>
   <td>{value}</td>
   </tr>
  )

}


const Statistics = ( {good, neutral, bad} ) => {
   const total = good + neutral + bad
   const average = ((1*good) + (-1*bad)) / total
   const positive = (100 * good) / total 
   if (total === 0)  {
     return ( 
       'No feedback given' 
      )
   }
   return (
     <table>
     <tbody>
       <StatisticsLine text={'good'} value={good} /> 
       <StatisticsLine text={'neutral'} value={neutral} /> 
       <StatisticsLine text={'bad'} value={bad} /> 
       <StatisticsLine text={'all'} value={total} /> 
       <StatisticsLine text={'average'} value={average} /> 
       <StatisticsLine text={'positive'} value={positive + ' %'} /> 
     </tbody>
     </table>
   )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)  
  const handleGoodClick = () => setGood(good+1)
  const handleBadClick = () => setBad(bad+1)
  const handleNeutralClick = () => setNeutral(neutral+1)


  return (
    <div>
       <h1>Give feedback</h1>
          <Button handleClick={handleGoodClick} text={'good'} />
          <Button handleClick={handleNeutralClick} text={'neutral'} />
          <Button handleClick={handleBadClick} text={'bad'} />
       <h1>Statistics</h1>
          <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )

}

export default App;

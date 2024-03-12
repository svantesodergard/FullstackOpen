import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Hello = (props) => {
    return (<div>
        {props.hello} {props.world}!
    </div>)
}

function App() {
    const hello = "Hej"
    const world = "Värld"
    return (
        <>
            <Hello hello="Hello" world="World" />
            <p>{hello} {world} {Date.now()}</p>
        </>
    )
}

export default App

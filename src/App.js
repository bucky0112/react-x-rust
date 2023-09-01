import { useState } from 'react'
import init, { fibonacci } from 'wasm-lib'
import logo from './logo.png'
import './App.css'

const calFibonacci = (n) => {
  if (n <= 1) {
    return n
  }
  return calFibonacci(n - 1) + calFibonacci(n - 2)
}

function App() {
  const [fibonacciNumRUST, setFibonacciNumRUST] = useState(0)
  const [fibonacciNumJS, setFibonacciNumJS] = useState(0)
  const [inputNum, setInputNum] = useState(0)
  const [rustTime, setRustTime] = useState(0)
  const [jsTime, setJsTime] = useState(0)

  const handleFibonacciRUST = () => {
    let start = new Date().getTime()
    init().then(() => {
      setFibonacciNumRUST(fibonacci(inputNum))
      let end = new Date().getTime()
      setRustTime(end - start)
    })
  }

  const handleFibonacciJS = () => {
    let start = new Date().getTime()
    let result = calFibonacci(inputNum)
    setFibonacciNumJS(result)
    let end = new Date().getTime()
    setJsTime(end - start)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <input
          value={inputNum}
          onChange={(e) => setInputNum(e.target.value)}
          className='inputValue'
        />
        <div className='fibonacciBtn'>
          <div>
            <button onClick={handleFibonacciRUST}>RUST</button>
            <p>{fibonacciNumRUST}</p>
            <p>時間： {rustTime} ms</p>
          </div>
          <div>
            <button onClick={handleFibonacciJS}>JS</button>
            <p>{fibonacciNumJS}</p>
            <p>時間： {jsTime} ms</p>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
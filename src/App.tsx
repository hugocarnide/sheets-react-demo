import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { UniverSheet } from './components/univers-sheet';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <div className="main-content">
        <div className="sheet-section">
          <h1>Champions League Teams</h1>
          <UniverSheet />
        </div>

        <div className="vite-section">
          <div className="logos">
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

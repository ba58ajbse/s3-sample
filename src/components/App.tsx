import React from 'react'
import '../assets/css/App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Deploy by GitHub Actions</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App

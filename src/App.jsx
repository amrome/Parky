import { useState } from 'react';
import './index.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <header className="app-header">
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src="/react.svg" className="logo react" alt="React logo" />
        </a>
        <h1>Parky</h1>
      </header>
      <main>
        <div className="card">
          <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the React logo to learn more
        </p>
      </main>
    </div>
  );
}



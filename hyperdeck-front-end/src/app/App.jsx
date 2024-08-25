import './App.css';
import React from 'react';
import { Hyperdeck } from '../features/hyperdeck/Hyperdeck.jsx';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hyperdeck Control</h1>
        <Hyperdeck/>
      </header>
    </div>
  );
}

export default App;


// .then(response => {
//   response.json().then(data => {
//     console.log(data);
//   })
// })
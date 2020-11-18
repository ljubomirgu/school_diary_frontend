import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dnevnik from './Components/Dnevnik'
import AppWithRouter from './Components/ApiWithRouter'
import DnevnikOld from './Components/DnevnikOld'
import ApiWR from './Components/ApiWR'


function App() {
  return (
    <div className="App">
      <ApiWR />
    </div>
  );
}

export default App;

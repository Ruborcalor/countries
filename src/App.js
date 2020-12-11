import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect } from 'react';


function App() {
  const [ countries, setCountries ] = React.useState();

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`)
      .then(res => {
        console.log(res.data);
        const countries = res.data;
        setCountries({ countries });
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
  );
}

export default App;

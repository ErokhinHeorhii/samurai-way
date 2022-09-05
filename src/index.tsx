import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import state from './components/Redux/State'



ReactDOM.render(
    <App appState={state} />,
  document.getElementById('root')
);


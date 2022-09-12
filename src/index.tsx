import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import state, {addPost} from './components/Redux/State'
import { BrowserRouter } from "react-router-dom";



ReactDOM.render(
  <BrowserRouter>
    <App appState={state}  addPost={addPost}/>
  </BrowserRouter>,
  document.getElementById('root')
);


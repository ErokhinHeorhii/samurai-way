import React from 'react';
import ReactDOM from 'react-dom';
import App, { TypeForAllData } from './App';
import './index.css';
import  { addPost } from './components/Redux/State'
import { BrowserRouter } from "react-router-dom";


 export const rerenderEntireTree = (state:TypeForAllData) => {
  ReactDOM.render(
    <BrowserRouter>
      <App appState={state} addPost={addPost} />
    </BrowserRouter>,
    document.getElementById('root')
  );
}

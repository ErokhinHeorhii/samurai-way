import store from './components/Redux/State';
import React from 'react';
import ReactDOM from 'react-dom';
import App, { TypeForAllData } from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";


const rerenderEntireTree = (state: TypeForAllData) => {
  ReactDOM.render(
    <BrowserRouter>
      <App appState={state} dispatch={store.dispatch.bind(store)}
      />
    </BrowserRouter>,
    document.getElementById('root')
  );
}
rerenderEntireTree(store.getState())
store.subscribe(rerenderEntireTree)

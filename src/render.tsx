import React from 'react';
import ReactDOM from 'react-dom';
import App, { TypeForAllData } from './App';
import './index.css';
import  { addMessage, addPost, updateNewMessageText, updateNewPostText } from './components/Redux/State'
import { BrowserRouter } from "react-router-dom";


 export const rerenderEntireTree = (state:TypeForAllData) => {
  ReactDOM.render(
    <BrowserRouter>
      <App appState={state} addPost={addPost}  updateNewPostText={updateNewPostText} addMessage={addMessage} updateNewMessageText={updateNewMessageText}/>
    </BrowserRouter>,
    document.getElementById('root')
  );
}

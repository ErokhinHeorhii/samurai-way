import state, { subscribe } from './components/Redux/State';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { addMessage, addPost, updateNewMessageText, updateNewPostText } from './components/Redux/State'
import { BrowserRouter } from "react-router-dom";


  const rerenderEntireTree = () => {
  ReactDOM.render(
    <BrowserRouter>
      <App appState={state} addPost={addPost}
        updateNewPostText={updateNewPostText}
        addMessage={addMessage}
        updateNewMessageText={updateNewMessageText}
      />
    </BrowserRouter>,
    document.getElementById('root')
  );
}
rerenderEntireTree()
subscribe(rerenderEntireTree)

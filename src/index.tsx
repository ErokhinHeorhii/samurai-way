import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

let postsData = [
  { id: 1, message: "Hi", likeCount: 10 },
  { id: 2, message: "How are you", likeCount: 2 },
  { id: 3, message: "yooo", likeCount: 4 },
]

let dialogsData = [
  { id: 1, name: "Borya" },
  { id: 2, name: "Olga" },
  { id: 3, name: "Misha" },
  { id: 4, name: "George" },
  { id: 5, name: "Sacha" },
  { id: 6, name: "Tanya" },
  { id: 7, name: "Sacha" }
]

let messagesData = [
  { id: 1, message: "Hi" },
  { id: 2, message: "How are you" },
  { id: 3, message: "yooo" },
  { id: 4, message: "byu" },
]

ReactDOM.render(
    <App postsData={postsData} dialogsData={dialogsData} messagesData={messagesData}/>,
  document.getElementById('root')
);


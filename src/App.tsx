import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import s from "./components/Dialogs/Dialogs.module.css";

function App(props: any) {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            {/* <Profile/>*/}
            <div className='app-wrapper-content'>
                <Dialogs/>
            </div>
        </div>
    );
}

export default App;

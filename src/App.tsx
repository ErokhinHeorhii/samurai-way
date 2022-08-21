import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
// import s from "./components/Dialogs/Dialogs.module.css";
import { BrowserRouter,  Route } from "react-router-dom";
import News from './Router/News/News';
import Music from './Router/Music/Music';
import Setting from './Router/Setting/Setting';


function App(props: any) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header />
                <Navbar />
                <div className='app-wrapper-content'>
                  
                        <Route path='/dialogs' component={Dialogs} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/news' component={News} />
                        <Route path='/music' component={Music} />
                        <Route path='/setting' component={Setting} />
                  
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

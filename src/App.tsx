import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar, { mySideBar } from './components/Navbar/Navbar';
import Profile from './Profile/Profile';
import Dialogs, { myDialogsDataType } from "./components/Dialogs/Dialogs";
import { Route } from "react-router-dom";
import News from './Router/News/News';
import Music from './Router/Music/Music';
import Setting from './Router/Setting/Setting';
import { myPostType } from './Profile/MyPost/MyPost';
import { myMessageType } from './components/Dialogs/Message/Message';

export type dialogsPageType = {
    dialogsData: {
        dialogs: myDialogsDataType[]
        messages: myMessageType[]
        answerMessages: myMessageType[]
    }
}
export type postPageType = {
    postsData: {
        posts: myPostType[]
    }
    addPost:(postMessage: string)=>void
}

export type sideBarPageType = {
    sideBar: {
        sideBar: mySideBar[]
    }
}

export type TypeForAllData = {

    profilePage: {
        posts: myPostType[]
    },
    dialogsPage: {
        dialogs: myDialogsDataType[]
        messages: myMessageType[]
        answerMessages: myMessageType[]
    }
    sideBar: {
        sideBar: mySideBar[]
    }
}

type AppStateType = {
    appState: TypeForAllData
    addPost:(postMessage: string)=>void
}

function App(props: AppStateType) {
    const { profilePage, dialogsPage, sideBar } = props.appState;

    return (
        <div className="app-wrapper">
            <Header />
            <Navbar sideBar={sideBar} />
            <div className='app-wrapper-content'>
                <Route path='/dialogs' render={() => <Dialogs dialogsData={dialogsPage} />} />
                <Route path='/profile' render={() => <Profile postsData={profilePage}  addPost={props.addPost}/>} />
                <Route path='/news' component={News} />
                <Route path='/music' component={Music} />
                <Route path='/setting' component={Setting} />
            </div>
        </div>
    );
}

export default App;

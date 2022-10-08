import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import  { mySideBar } from './components/Navbar/Navbar';
import Profile from './Profile/Profile';
import { myDialogsDataType } from "./components/Dialogs/Dialogs";
import { Route } from "react-router-dom";
import News from './Router/News/News';
import Music from './Router/Music/Music';
import Setting from './Router/Setting/Setting';
import { myPostType } from './Profile/MyPost/MyPost';
import { myMessageType } from './components/Dialogs/Message/Message';
import { AllActionType } from './components/Redux/Store';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';


export type TypeForAllData = {

    profilePage: {
        posts: myPostType[]
        newPostText: string
    },
    dialogsPage: {
        dialogs: myDialogsDataType[]
        messages: myMessageType[]
        newDialogsMessage: string
        answerMessages: myMessageType[]
    }
    sideBar: {
        sideBar: mySideBar[]
    }
}

export type AppStateType = {
    appState: TypeForAllData
    dispatch: (
        action: AllActionType
    ) => void
}

// function App(props: AppStateType) {
function App() {
    // const { profilePage, dialogsPage, sideBar } = props.appState;
    // const { dispatch } = props

    return (
        <div className="app-wrapper">
            <Header />
            <NavbarContainer />
            <div className='app-wrapper-content'>
                <Route path='/dialogs' render={() =>
                    <DialogsContainer
                    />} />
                {/* <Route path='/' render={() => <Profile postsData={profilePage}
                    dispatch={dispatch} />} /> */}
                <Route path='/profile' render={() =>
                    <Profile
                    // postsData={profilePage}
                    //     dispatch={dispatch}
                    />} />

                <Route path='/news' component={News} />
                <Route path='/music' component={Music} />
                <Route path='/setting' component={Setting} />
            </div>
        </div>
    );
}

export default App;

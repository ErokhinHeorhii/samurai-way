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
import { AddMessageType, AddPostActionType, UpdateNewMessageTextType, UpdateNewPostTextActionType } from './components/Redux/State';


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
    // addPost: () => void
    // updateNewPostText: (newText: string) => void
    // addMessage: () => void
    // updateNewMessageText:(newMessage:string)=>void
    dispatch: (
        action: AddPostActionType |
            UpdateNewPostTextActionType |
            UpdateNewMessageTextType |
            AddMessageType
    ) => void
}

function App(props: AppStateType) {
    const { profilePage, dialogsPage, sideBar } = props.appState;
    const { dispatch } = props

    return (
        <div className="app-wrapper">
            <Header />
            <Navbar sideBar={sideBar} />
            <div className='app-wrapper-content'>

                <Route path='/dialogs' render={() =>
                    <Dialogs dialogsData={dialogsPage}
                        // addMessage={addMessage}
                        // updateNewMessageText={updateNewMessageText} 
                        dispatch={dispatch}
                    />} />

                <Route path='/profile' render={() =>
                    <Profile postsData={profilePage}
                        // addPost={addPost}
                        // updateNewPostText={updateNewPostText}
                        dispatch={dispatch}
                    />} />

                <Route path='/news' component={News} />
                <Route path='/music' component={Music} />
                <Route path='/setting' component={Setting} />
            </div>
        </div>
    );
}

export default App;

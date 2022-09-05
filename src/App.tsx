import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './Profile/Profile';
import Dialogs, { myDialogsDataType } from "./components/Dialogs/Dialogs";
import { BrowserRouter,  Route } from "react-router-dom";
import News from './Router/News/News';
import Music from './Router/Music/Music';
import Setting from './Router/Setting/Setting';
import { myPostType } from './Profile/MyPost/MyPost';
import { myMessageType } from './components/Dialogs/Message/Message';

export  type TypeForAllData= {
    dialogsData: myDialogsDataType[]
    postsData:myPostType[]
    messagesData:myMessageType[]
}


function App (props: TypeForAllData ) {
const {postsData, dialogsData, messagesData} = props;
    
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header />
                <Navbar />
                <div className='app-wrapper-content'>
                  
                        <Route path='/dialogs' render={()=><Dialogs dialogsData={dialogsData} messagesData={messagesData}/>} />
                        <Route path='/profile' render={()=><Profile postsData={postsData}/>} />
                        <Route path='/news' component={News} />
                        <Route path='/music' component={Music} />
                        <Route path='/setting' component={Setting} />
                  
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

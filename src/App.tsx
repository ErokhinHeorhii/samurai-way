import React from 'react';
import './App.css';
import {mySideBar} from './components/Navbar/Navbar';
import {myDialogsDataType} from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import News from './Router/News/News';
import Music from './Router/Music/Music';
import Setting from './Router/Setting/Setting';
import {myPostType} from './Profile/MyPost/MyPost';
import {myMessageType} from './components/Dialogs/Message/Message';
import {AllActionType} from './components/Redux/Store';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initialiseAppTC} from "./components/Redux/AppReducer";
import {AllAppStateType} from "./components/Redux/RedaxStore";
import Preloader from "./components/common/preloader/Preloader";


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
type MapStateToPropsType = {
    initialized:boolean
}
type MapDispatchToPropsType = {
    initialiseAppTC: () => void
}

const mapStateToProps = (state: AllAppStateType):MapStateToPropsType => ({
    initialized: state.initialized.initialized
})

export type AppPropsType = MapDispatchToPropsType & MapStateToPropsType

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initialiseAppTC()
    }

    render() {

        if(!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavbarContainer/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() =>
                        <DialogsContainer
                        />}/>
                    <Route path='/profile/:userId?' render={() =>
                        //обозначение параментра для withRouter в "match/path/userId"
                        <ProfileContainer/>}/>
                    <Route path='/users' render={() =>
                        <UsersContainer/>}/>
                    <Route path='/login' render={() =>
                        <Login/>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/setting' component={Setting}/>
                    {/*<Route path='/' component={ProfileContainer}/>*/}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps,
    {initialiseAppTC})(App)

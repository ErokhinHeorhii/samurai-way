import React from 'react';
import './App.css';
import {mySideBar} from './components/Navbar/Navbar';
import {myDialogsDataType} from "./components/Dialogs/Dialogs";
import {BrowserRouter, HashRouter, Route} from "react-router-dom";
import Setting from './Router/Setting/Setting';
import {myPostType} from './Profile/MyPost/MyPost';
import {myMessageType} from './components/Dialogs/Message/Message';
import {AllActionType} from './components/Redux/Store';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {initialiseAppTC} from './components/Redux/AppReducer';
import store, {AllAppStateType} from './components/Redux/RedaxStore';
import Preloader from './components/common/preloader/Preloader';
import {withSuspense} from "./HOC/WithSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Profile/ProfileContainer'));
const News = React.lazy(() => import('./Router/News/News'));
const Music = React.lazy(() => import('./Router/Music/Music'));

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
    initialized: boolean
}
type MapDispatchToPropsType = {
    initialiseAppTC: () => void
}

const mapStateToProps = (state: AllAppStateType): MapStateToPropsType => ({
    initialized: state.initialized.initialized
})

export type AppPropsType = MapDispatchToPropsType & MapStateToPropsType

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initialiseAppTC()
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavbarContainer/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                    {/*//обозначение параментра для withRouter в "match/path/userId"*/}
                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                    <Route path='/users' render={() =>
                        <UsersContainer/>}/>
                    <Route path='/login' render={() =>
                        <Login/>}/>
                    <Route path='/news' render={withSuspense(News)}/>
                    <Route path='/music' render={withSuspense(Music)}/>
                    <Route path='/setting' render={Setting}/>
                    {/*<Route path='/' component={ProfileContainer}/>*/}
                </div>
            </div>
        );
    }
}

let AppContainer = connect(mapStateToProps,
    {initialiseAppTC})(App)

export let MainApp = () => {
    return (<HashRouter >
            <Provider store={store}>
                {/* <App appState={state} dispatch={store.dispatch.bind(store)} /> */}
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}
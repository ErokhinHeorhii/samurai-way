import {applyMiddleware, combineReducers, createStore} from "redux";
import DialogReducer from "./DialogReduser";
import ProfileReducer, {ActionTypeForProfileReducer} from "./ProfileReduser";
import SideBarReducer from "./SideBarReduser";
import UsersRedusers, {ActionTypeForUserReduser} from "./UsersReduser";
import HeaderAuthReduser, {ActionTypeForAuthReduser} from "./HeaderAuthReduser";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'

export const rootReduser = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogReducer,
    sideBar: SideBarReducer,
    usersPage: UsersRedusers,
    auth: HeaderAuthReduser,
    form: formReducer
});

export type AllAppStateType = ReturnType<typeof rootReduser>

type AnyAction =
    ActionTypeForUserReduser
    |ActionTypeForAuthReduser
    |ActionTypeForProfileReducer

export type AppDispatch = ThunkDispatch<AllAppStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AllAppStateType,
    unknown,
    AnyAction>

let store = createStore(rootReduser, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store
export default store


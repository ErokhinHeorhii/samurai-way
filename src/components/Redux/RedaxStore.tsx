import {applyMiddleware, combineReducers, createStore} from "redux";
import DialogReducer from "./DialogReduser";
import ProfileReducer, {ActionTypeForProfileReducer} from "./ProfileReduser";
import SideBarReducer from "./SideBarReduser";
import UsersRedusers, {ActionTypeForUserReduser} from "./UsersReduser";
import HeaderAuthReduser, {ActionTypeForAuthReduser, FormStopSubmitType} from "./HeaderAuthReduser";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {reducer as formReducer, stopSubmit} from 'redux-form'
import AppReducer, {ActionTypeForAppReduser} from "./AppReduser";

export const rootReduser = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogReducer,
    sideBar: SideBarReducer,
    usersPage: UsersRedusers,
    auth: HeaderAuthReduser,
    initialized: AppReducer,
    form: formReducer
});

export type AllAppStateType = ReturnType<typeof rootReduser>

export type AnyAction =
    ActionTypeForUserReduser
    | ActionTypeForAuthReduser
    | ActionTypeForProfileReducer
    | FormStopSubmitType
| ActionTypeForAppReduser

export type AppDispatch = ThunkDispatch<AllAppStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AllAppStateType,
    unknown,
    AnyAction>

let store = createStore(rootReduser, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store
export default store


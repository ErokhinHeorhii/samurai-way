import {applyMiddleware, combineReducers, createStore} from "redux";
import DialogReducer from "./DialogReducer";
import ProfileReducer, {ActionTypeForProfileReducer} from "./ProfileReducer";
import SideBarReducer from "./SideBarReducer";
import UsersRedusers, {ActionTypeForUserReduser} from "./UsersReducer";
import HeaderAuthReducer, {ActionTypeForAuthReducer, FormStopSubmitType} from "./HeaderAuthReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {reducer as formReducer, stopSubmit} from 'redux-form'
import AppReducer, {ActionTypeForAppReduser} from "./AppReducer";

export const rootReduser = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogReducer,
    sideBar: SideBarReducer,
    usersPage: UsersRedusers,
    auth: HeaderAuthReducer,
    initialized: AppReducer,
    form: formReducer
});

export type AllAppStateType = ReturnType<typeof rootReduser>

export type AnyAction =
    ActionTypeForUserReduser
    | ActionTypeForAuthReducer
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


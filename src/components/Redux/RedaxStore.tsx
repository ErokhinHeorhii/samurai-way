import {applyMiddleware, combineReducers, createStore} from "redux";
import DialogReducer from "./DialogReducer";
import ProfileReducer, {ActionTypeForProfileReducer} from "./ProfileReducer";
import SideBarReducer from "./SideBarReducer";
import UsersRedusers, {ActionTypeForUserReduser} from "./UsersReducer";
import HeaderAuthReducer, {ActionTypeForAuthReducer, FormStopSubmitType} from "./HeaderAuthReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import { reducer as formReducer} from 'redux-form'
import AppReducer, {ActionTypeForAppReduser} from "./AppReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const rootReducer = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogReducer,
    sideBar: SideBarReducer,
    usersPage: UsersRedusers,
    auth: HeaderAuthReducer,
    initialized: AppReducer,
    form: formReducer
});

export type AllAppStateType = ReturnType<typeof rootReducer>

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
export type AppRootStateType = ReturnType<typeof rootReducer>
// let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
        // other store enhancers if any
    )
);

// @ts-ignore
window.store = store
export default store


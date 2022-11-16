import {applyMiddleware, combineReducers, createStore} from "redux";
import DialogReducer from "./DialogReduser";
import ProfileReducer, {actionTypeForProfileReduser} from "./ProfileReduser";
import SideBarReducer from "./SideBarReduser";
import UsersRedusers, {ActionTypeForUserReduser} from "./UsersReduser";
import HeaderAuthReduser, {ActionTypeForAuthReduser} from "./HeaderAuthReduser";
import thunkMiddleware, {ThunkAction} from "redux-thunk"

export const rootReduser = combineReducers({
  profilePage:ProfileReducer,
  dialogsPage:DialogReducer,
  sideBar: SideBarReducer,
  usersPage:UsersRedusers,
  auth: HeaderAuthReduser
});

export type AllAppStateType =ReturnType<typeof rootReduser>
type AnyAction=ActionTypeForUserReduser|ActionTypeForAuthReduser|actionTypeForProfileReduser

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AllAppStateType,
    unknown,
    AnyAction
    >

let store = createStore(rootReduser, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store
export default store


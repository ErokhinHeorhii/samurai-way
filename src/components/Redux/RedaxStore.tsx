import {applyMiddleware, combineReducers, createStore} from "redux";
import DialogReducer from "./DialogReduser";
import ProfileReducer from "./ProfileReduser";
import SideBarReducer from "./SideBarReduser";
import UsersRedusers from "./UsersReduser";
import HeaderAuthReduser from "./HeaderAuthReduser";
import  thunkMiddleware from "redux-thunk"

export const rootReduser = combineReducers({
  profilePage:ProfileReducer,
  dialogsPage:DialogReducer,
  sideBar: SideBarReducer,
  usersPage:UsersRedusers,
  auth: HeaderAuthReduser
});

export type AllAppStateType =ReturnType<typeof rootReduser>

let store = createStore(rootReduser, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store
export default store


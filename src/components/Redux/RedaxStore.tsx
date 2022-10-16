import { combineReducers, createStore } from "redux";
import DialogReducer from "./DialogReduser";
import ProfileReducer from "./ProfileReduser";
import SideBarReducer from "./SideBarReduser";


export const rootReduser = combineReducers({
  profilePage:ProfileReducer,
  dialogsPage:DialogReducer,
  sideBar: SideBarReducer
});

export type AllAppStateType =ReturnType<typeof rootReduser>

let store = createStore(rootReduser)

// @ts-ignore
window.store = store
export default store


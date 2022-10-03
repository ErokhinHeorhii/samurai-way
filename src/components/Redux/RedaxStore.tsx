import { combineReducers, createStore } from "redux";
import DialogReducer from "./DialogReduser";
import ProfileReducer from "./ProfileReduser";
import SideBarReducer from "./SideBarReduser";


let redusers = combineReducers({
  profilePage:ProfileReducer,
  dialogsPage:DialogReducer,
  sideBar: SideBarReducer
});

let store = createStore(redusers)
export default store
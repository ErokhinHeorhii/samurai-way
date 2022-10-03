import { combineReducers, createStore } from "redux";
import DialogReducer from "./DialogReduser";
import ProfileReducer from "./ProfileReduser";
import SideBarReducer from "./SideBarReduser";


let reduserc = combineReducers({
  profilePage:ProfileReducer,
  dialogsPage:DialogReducer,
  sideBar: SideBarReducer
});

let store = createStore(reduserc)
export default store
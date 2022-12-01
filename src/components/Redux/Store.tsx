import { TypeForAllData } from "../../App";
import DialogReducer, {  AddMessageType, ADD_MESSAGE, UPDATE_NEW_MESSAGE_TEXT } from "./DialogReduser";
import ProfileReducer, {
  AddPostACType,
  // UpdateNewPostTextACType,
  UPDATE_NEW_POST_TEXT,
  SetStatusACType
} from "./ProfileReduser";
import SideBarReducer from "./SideBarReduser";
import {v1} from "uuid";

export const ADD_POST = "ADD-POST"
// export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
// export const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT"
// export const ADD_MESSAGE = "ADD-MESSAGE"

export type StoreType = {
  _state: TypeForAllData

  _callSubScriber: (state: TypeForAllData) => void
  getState: () => TypeForAllData

  // updateNewPostText: (newText: string) => void
  // updateNewMessageText: (newMessage: string) => void
  // addPost: () => void
  // addMessage: () => void

  subscribe: (observer: (state: TypeForAllData) => void) => void
  dispatch: (
    action: AllActionType
  ) => void
}
export type AllActionType =
  AddPostACType |
  // UpdateNewPostTextACType |
  // UpdateNewMessageTextType |
  AddMessageType

///////////////////////////////////////////////////////////////////////
const store: StoreType = {

  _state: {
    profilePage: {
      posts: [
        { id: v1(), message: "Hi", likeCount: 10 },
        { id: v1(), message: "How are you", likeCount: 2 },
        { id: v1(), message: "yooo", likeCount: 4 },
      ],
      newPostText: "Hello everybody)!"
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Borya", src: "https://cspromogame.ru//storage/upload_images/avatars/1456.jpg" },
        { id: 2, name: "Olga", src: "https://cspromogame.ru//storage/upload_images/avatars/1289.jpg" },
        { id: 3, name: "Misha", src: "https://cspromogame.ru//storage/upload_images/avatars/858.jpg" },
        { id: 4, name: "George", src: "https://cspromogame.ru//storage/upload_images/avatars/833.jpg" },
        { id: 5, name: "Sacha", src: "https://cspromogame.ru//storage/upload_images/avatars/3975.jpg" },
        { id: 6, name: "Tanya", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSot6M-oAP1lg2OuHL4lieNgospaOdne0hmQ&usqp=CAU" },
      ],
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you" },
        { id: 3, message: "yooo" },
        { id: 4, message: "byu" },
      ],
      newDialogsMessage: "Hello",
      answerMessages: [
        { id: 1, message: "Hello here" },
        { id: 2, message: "Fine" },
        { id: 3, message: "yooo toooo" },
        { id: 4, message: "see you leter" },
      ]
    },
    sideBar: {
      sideBar: [
        { avatarSrc: "https://cspromogame.ru//storage/upload_images/avatars/897.jpg", name: "Borya" },
        { avatarSrc: "https://cspromogame.ru//storage/upload_images/avatars/4169.jpg", name: "Vashya" },
        { avatarSrc: "https://cspromogame.ru//storage/upload_images/avatars/899.jpg", name: "Igor" },

      ]
    }
  },

  _callSubScriber(state: TypeForAllData) {
  },

  getState() {
    return this._state
  },

  subscribe(observer: (state: TypeForAllData) => void) {
    this._callSubScriber = observer
    //  патерн -observer, такой же как и add.eventListener
  },


  dispatch(action: AllActionType) { // {type: "ADD-POST"}

    if (action.type === ADD_POST) {
      // this._state.profilePage = ProfileReducer(this._state.profilePage, action)
    } else if ( action.type === ADD_MESSAGE) {
      // this._state.dialogsPage = DialogReducer(this._state.dialogsPage, action)
    } else { this._state.sideBar = SideBarReducer(this._state.sideBar, action) }

    this._callSubScriber(this._state)
  }
}

export default store

// @ts-ignore
// window.store = store;


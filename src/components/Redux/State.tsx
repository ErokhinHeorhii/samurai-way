import { TypeForAllData } from "../../App";
import { myPostType } from "../../Profile/MyPost/MyPost";


const store = {

  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi", likeCount: 10 },
        { id: 2, message: "How are you", likeCount: 2 },
        { id: 3, message: "yooo", likeCount: 4 },
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
        { id: 6, name: "Tanya", src: "https://cspromogame.ru//storage/upload_images/avatars/3958.jpg" },
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

 getState(){
  return this._state
 },

  _callSubScriber(state: TypeForAllData) {
    // console.log("state changed")
  },

  subscribe(observer: (state: TypeForAllData) => void) {
    this._callSubScriber = observer
    //  патерн -observer, такой же как и add.eventListener
  },

  addPost() {
    const newPost: myPostType = {
      id: 5,
      message: this._state.profilePage.newPostText,
      likeCount: 0
    };

    this._state.profilePage.posts.push(newPost)
    this._state.profilePage.newPostText = ""
    this._callSubScriber(this._state)
  },

  updateNewPostText(newText: string) {
    this._state.profilePage.newPostText = newText
    this._callSubScriber(this._state)
  },

  addMessage() {
    const newMessage = {
      id: 1, message: this._state.dialogsPage.newDialogsMessage
    }
    this._state.dialogsPage.messages.push(newMessage)
    this._state.dialogsPage.newDialogsMessage = ''
    this._callSubScriber(this._state)
  },

  updateNewMessageText(newMessage: string) {
    this._state.dialogsPage.newDialogsMessage = newMessage
    this._callSubScriber(this._state)
  }

}


export default store
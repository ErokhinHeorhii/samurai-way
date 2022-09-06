
const state = {
  profilePage: {
    posts: [
      { id: 1, message: "Hi", likeCount: 10 },
      { id: 2, message: "How are you", likeCount: 2 },
      { id: 3, message: "yooo", likeCount: 4 },
    ]
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
    answerMessages: [
      { id: 1, message: "Hello here" },
      { id: 2, message: "Fine" },
      { id: 3, message: "yooo toooo" },
      { id: 4, message: "see you leter" },
    ]
  },
  sideBarPage: {
    sideBar: [
      { avatarSrc: "https://cspromogame.ru//storage/upload_images/avatars/897.jpg", name: "Borya" },
      { avatarSrc: "https://cspromogame.ru//storage/upload_images/avatars/4169.jpg", name: "Vashya" },
      { avatarSrc: "https://cspromogame.ru//storage/upload_images/avatars/899.jpg", name: "Igor" },
      
    ]
  }
}
export default state
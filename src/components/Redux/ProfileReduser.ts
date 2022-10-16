import {
  myPostType,
} from "../../Profile/MyPost/MyPost";

export const ADD_POST = "ADD-POST";
export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
export type AddPostActionType = ReturnType<typeof addPostActionCreater>;
export type UpdateNewPostTextActionType = ReturnType<
  typeof updateNewPostTextActionCreater
>;

let initialState = {
  posts: [
    { id: 1, message: "Hi", likeCount: 10 },
    { id: 2, message: "How are you", likeCount: 2 },
    { id: 3, message: "yooo", likeCount: 4 },
  ],
  newPostText: "Hello everybody)!",
};

export type InitialStateTypeForProfile = {
  posts: myPostType[]
  newPostText: string
}

const ProfileReducer = (
  state: InitialStateTypeForProfile = initialState,
  action: AddPostActionType | UpdateNewPostTextActionType
): InitialStateTypeForProfile => {
  switch (action.type) {
    case ADD_POST: {
      if (!state.newPostText) {
        return state;
      } else {
        const newPost: myPostType = {
          id: 5,
          message: state.newPostText,
          likeCount: 5,
        };
        let newState = {...state, posts:[newPost, ...state.posts], newPostText:" "}
        // state.posts.push(newPost);
        // state.newPostText = "";
        return newState;
      }
    }
    case UPDATE_NEW_POST_TEXT: {
      return {...state, newPostText: action.newText};
    }
    default:
      return state;
  }
};

export const addPostActionCreater = () => ({ type: ADD_POST } as const);
export const updateNewPostTextActionCreater = (text: string) =>
  ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
  } as const);

export default ProfileReducer;

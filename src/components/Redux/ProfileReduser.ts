import {
  myPostType,
  NewPostDataTypeForReduser,
} from "../../Profile/MyPost/MyPost";
import { AddPostActionType, UpdateNewPostTextActionType } from "./State";
export const ADD_POST = "ADD-POST";
export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const ProfileReducer = (
  state: NewPostDataTypeForReduser,
  action: AddPostActionType | UpdateNewPostTextActionType
): NewPostDataTypeForReduser => {
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
        state.posts.push(newPost);
        state.newPostText = "";
        return state;
      }
    }
    case UPDATE_NEW_POST_TEXT: {
      state.newPostText = action.newText;
      return state;
    }
    default:
      return state;
  }

  
};

export const addPostActionCreater = () => ({ type: ADD_POST }) as const
export const updateNewPostTextActionCreater = (text: string) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text
}) as const


export default ProfileReducer;

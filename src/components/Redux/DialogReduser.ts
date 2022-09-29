import { NewDialogsPageType } from "../Dialogs/Dialogs";
import { AddMessageType, UpdateNewMessageTextType } from "./State";

const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
const ADD_MESSAGE = "ADD-MESSAGE";

const DialogReducer = (
  state: NewDialogsPageType,
  action: UpdateNewMessageTextType | AddMessageType
): NewDialogsPageType => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT: {
      state.newDialogsMessage = action.newMessage;
      return state;
    }
    case ADD_MESSAGE: {
      if (!state.newDialogsMessage) {
        return state;
      } else {
        const newMessage = {
          id: 1,
          message: state.newDialogsMessage,
        };
        state.messages.push(newMessage);
        state.newDialogsMessage = "";
        return state;
      }
    }
    default:
      return state;
  }
};
export default DialogReducer;

import {myDialogsDataType} from "../Dialogs/Dialogs";
import {myMessageType} from "../Dialogs/Message/Message";

export const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
export const ADD_MESSAGE = "ADD-MESSAGE";

// export type UpdateNewMessageTextType = ReturnType<typeof updateNewMessageTextActionCreater>;
export type AddMessageType = ReturnType<typeof addMessageActionCreater>;

export type InitialStateType = {
    dialogs: myDialogsDataType[];
    messages: myMessageType[];
    //при использовании form from Redax хранить промежуточное значения
    // импута в отдельном стейте не требуется.Значение будет храниться в form от Redax
    //
    // newDialogsMessage: string;
    answerMessages: myMessageType[];
};

const initialState: InitialStateType = {
    dialogs: [
        {
            id: 1,
            name: "Borya",
            src: "https://cspromogame.ru//storage/upload_images/avatars/1456.jpg",
        },
        {
            id: 2,
            name: "Olga",
            src: "https://cspromogame.ru//storage/upload_images/avatars/1289.jpg",
        },
        {
            id: 3,
            name: "Misha",
            src: "https://cspromogame.ru//storage/upload_images/avatars/858.jpg",
        },
        {
            id: 4,
            name: "George",
            src: "https://cspromogame.ru//storage/upload_images/avatars/833.jpg",
        },
        {
            id: 5,
            name: "Sacha",
            src: "https://cspromogame.ru//storage/upload_images/avatars/3975.jpg",
        },
        {
            id: 6,
            name: "Tanya",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSot6M-oAP1lg2OuHL4lieNgospaOdne0hmQ&usqp=CAU",
        },
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you"},
        {id: 3, message: "yooo"},
        {id: 4, message: "byu"},
    ],
    // newDialogsMessage: "Hello",
    answerMessages: [
        {id: 1, message: "Hello here"},
        {id: 2, message: "Fine"},
        {id: 3, message: "yooo toooo"},
        {id: 4, message: "see you leter"},
    ],
};

const DialogReducer = (
    state: InitialStateType = initialState,
    action:  AddMessageType
): InitialStateType => {
    switch (action.type) {
        // case UPDATE_NEW_MESSAGE_TEXT: {
        //     // state.newDialogsMessage = action.newMessage;
        //     return {...state, newDialogsMessage: action.newMessage};
        // }
        case ADD_MESSAGE: {

            const newMessage = {
                id: 6,
                message: action.newMessageBody,
            };
            let newState = {...state, messages: [newMessage, ...state.messages]};
            return newState;
        }
        default:
            return state;
    }
};
//Нет необбходимости в данном AC, тк значения с инпута снимаются с помощью form-Redax
// export const updateNewMessageTextActionCreater = (newMessage: string) =>
//     ({
//         type: UPDATE_NEW_MESSAGE_TEXT,
//         newMessage: newMessage,
//     } as const);

export const addMessageActionCreater = (newMessageBody: string) => ({type: ADD_MESSAGE, newMessageBody} as const);

export default DialogReducer;

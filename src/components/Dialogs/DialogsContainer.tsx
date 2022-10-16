import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    addMessageActionCreater,
    // AddMessageType,
    InitialStateType, updateNewMessageTextActionCreater,
    //  UpdateNewMessageTextType
} from "../Redux/DialogReduser";
import { AllAppStateType } from "../Redux/RedaxStore";
import Dialogs from "./Dialogs";
// import { myMessageType } from "./Message/Message";

// export type myDialogsDataType = {
//     id: number
//     name: string
//     src: string
// }
// export type NewDialogsPageType = {
//     dialogs: myDialogsDataType[]
//     messages: myMessageType[]
//     newDialogsMessage: string
//     answerMessages: myMessageType[]
// }

// export type dialogsPageType = {
//     dialogsData: NewDialogsPageType
//     // addMessage: () => void
//     // updateNewMessageText: (newMessage: string) => void
//     dispatch: (
//         action: UpdateNewMessageTextType | AddMessageType
//     ) => void
// }

// const DialogsContainer = (props: dialogsPageType) => {
//     const { dispatch, dialogsData } = props

//     const addValueTextarea = () => {
//         // addMessage()
//         dispatch(addMessageActionCreater())
//     }

//     const onChangeHandler = (text: string) => {
//         // const text = refLinkToTextarea.current?.value ? refLinkToTextarea.current.value : " "
//         // const text = e.currentTarget ? e.currentTarget.value : " "
//         // updateNewMessageText(text)
//         dispatch(updateNewMessageTextActionCreater(text))
//     }

//     return <Dialogs
//         updateNewMessageText={onChangeHandler}
//         addMessage={addValueTextarea}
//         dialogsData={dialogsData} />

// }

type MapStateToPropsType = {
    dialogsPage: InitialStateType
}

type MapDispatchToPropsType = {
    updateNewMessageText: (text: string) => void
    addMessage: () => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageText: (text: string) => {
            dispatch(updateNewMessageTextActionCreater(text))
        },
        addMessage: () => {
            dispatch(addMessageActionCreater())
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
export default DialogsContainer
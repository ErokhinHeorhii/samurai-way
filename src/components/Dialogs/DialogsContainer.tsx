import { addMessageActionCreater, updateNewMessageTextActionCreater } from "../Redux/DialogReduser";
import { AllActionType } from "../Redux/Store";
import Dialogs from "./Dialogs";
import { myMessageType } from "./Message/Message";

export type myDialogsDataType = {
    id: number
    name: string
    src: string
}
export type NewDialogsPageType = {
    dialogs: myDialogsDataType[]
    messages: myMessageType[]
    newDialogsMessage: string
    answerMessages: myMessageType[]
}

export type dialogsPageType = {
    dialogsData: NewDialogsPageType
    // addMessage: () => void
    // updateNewMessageText: (newMessage: string) => void
    dispatch: (
        action: AllActionType
    ) => void
}

const DialogsContainer = (props: dialogsPageType) => {
    const { dispatch } = props


    const addValueTextarea = () => {
        // addMessage()
        dispatch(addMessageActionCreater())
    }

    const onChangeHandler = (text:string) => {
        // const text = refLinkToTextarea.current?.value ? refLinkToTextarea.current.value : " "
        // const text = e.currentTarget ? e.currentTarget.value : " "
        // updateNewMessageText(text)
        dispatch(updateNewMessageTextActionCreater(text))
    }

    return <Dialogs updateNewMessageText={onChangeHandler} addMessage={addValueTextarea} dialogsData={props.dialogsData}/>
    
}

export default DialogsContainer
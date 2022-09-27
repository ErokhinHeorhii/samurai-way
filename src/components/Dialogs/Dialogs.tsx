import React, { ChangeEvent } from "react";
import SuperButton from "../../SuperButton/SuperButton";
import { AddMessageType, AddPostActionType, UpdateNewMessageTextType, UpdateNewPostTextActionType } from "../Redux/State";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogsItem/DialogItem";
import Message, { myMessageType } from "./Message/Message";

export type myDialogsDataType = {
    id: number
    name: string
    src: string
}

export type dialogsPageType = {
    dialogsData: {
        dialogs: myDialogsDataType[]
        messages: myMessageType[]
        newDialogsMessage: string
        answerMessages: myMessageType[]
    }
    // addMessage: () => void
    // updateNewMessageText: (newMessage: string) => void
    dispatch: (action: AddPostActionType | UpdateNewPostTextActionType|UpdateNewMessageTextType |AddMessageType) => void
}

const Dialogs = (props: dialogsPageType) => {
    const { dialogs, messages, answerMessages, newDialogsMessage } = props.dialogsData
    const { dispatch } = props

    let dialogsElements = dialogs.map(item => {
        return <DialogItem key={item.id} name={item.name} id={item.id} src={item.src} />
    })

    let messagesElements = messages.map(item => {
        return (<Message key={item.id} message={item.message} id={item.id} />
        )
    })

    let answerMessagesElements = answerMessages.map(item => {
        return <Message key={item.id} message={item.message} id={item.id} />
    })

    let refLinkToTextarea = React.createRef<HTMLTextAreaElement>()

    const addValueTextarea = () => {
        // addMessage()
        dispatch({ type: "ADD-MESSAGE" })
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // const text = refLinkToTextarea.current?.value ? refLinkToTextarea.current.value : " "
        const text = e.currentTarget ? e.currentTarget.value : " "
        // updateNewMessageText(text)
        dispatch({
            type: "UPDATE-NEW-MESSAGE-TEXT",
            newMessage: text
        })
    }

    return (<>

        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <textarea className={s.textarea} ref={refLinkToTextarea} value={newDialogsMessage}
                    onChange={onChangeHandler} >
                </textarea>
                <SuperButton onClick={addValueTextarea} >Add</SuperButton>
                {messagesElements}

            </div>
            <div className={s.messages}>
                {answerMessagesElements}
            </div>
        </div>
    </>
    )
}

export default Dialogs
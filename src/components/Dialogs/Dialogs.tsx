import React from "react";
import { dialogsPageType } from "../../App";
import SuperButton from "../../SuperButton/SuperButton";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogsItem/DialogItem";
import Message from "./Message/Message";

export type myDialogsDataType = {
    id: number
    name: string
    src: string
}

const Dialogs = (props: dialogsPageType) => {
    const { dialogs, messages, answerMessages } = props.dialogsData


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
        let value = refLinkToTextarea.current?.value
        alert(value)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea className={s.textarea} ref={refLinkToTextarea}></textarea>
                <SuperButton onClick={addValueTextarea} >Add</SuperButton>
            </div>
            <div className={s.messages}>
                {answerMessagesElements}
            </div>
        </div>
    )
}

export default Dialogs
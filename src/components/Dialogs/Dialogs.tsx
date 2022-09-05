import React from "react";
import { dialogsPageType } from "../../App";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogsItem/DialogItem";
import Message from "./Message/Message";

export type myDialogsDataType = {
    id: number
    name: string
}

const Dialogs = (props: dialogsPageType) => {
    const { dialogs, messages } = props.dialogsData


    let dialogsElements = dialogs.map(item => {
        return <DialogItem key={item.id} name={item.name} id={item.id} />
    })

    let messagesElements = messages.map(item => {
        return <Message key={item.id} message={item.message} id={item.id} />
    })

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs
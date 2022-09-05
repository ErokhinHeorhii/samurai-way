import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogsItem/DialogItem";
import Message, { myMessageType } from "./Message/Message";

 export type myDialogsDataType={
    id:number
    name:string
}

export type dialogsMessageDataType={
    dialogsData: myDialogsDataType[]
    messagesData:myMessageType[]
}


const Dialogs = (props: dialogsMessageDataType  ) => {
const {dialogsData, messagesData}= props

   
    let dialogsElements = dialogsData.map(item => {
        return <DialogItem key={item.id} name={item.name} id={item.id} />
    })

  
    let messagesElements = messagesData.map(item => {
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
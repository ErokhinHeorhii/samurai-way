import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogsItem/DialogItem";
import Message from "./Message/Message";



const Dialogs = (props: any) => {

    let dialogsData = [
        { id: 1, name: "Borya" },
        { id: 2, name: "Olga" },
        { id: 3, name: "Misha" },
        { id: 4, name: "George" },
        { id: 5, name: "Sacha" },
        { id: 6, name: "Tanya" },
        { id: 7, name: "Sacha" }
    ]
    let dialogsElements = dialogsData.map(item => {
        return <DialogItem key={item.id} name={item.name} id={item.id} />
    })

    let messagesData = [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you" },
        { id: 3, message: "yooo" },
        { id: 4, message: "byu" },
    ]
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
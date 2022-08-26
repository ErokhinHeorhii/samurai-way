import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css"

type DialogItemType = {
    name: string
    id: string| number
}

const DialogItem = (props: DialogItemType) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog}>
            <NavLink className={s.navLink} to={path} activeClassName={s.activeLink} >{props.name}</NavLink>
        </div>
    )
}

type MessageType = {
    message: string
    id: string | number
}

const Message = (props: MessageType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

const Dialogs = (props: any) => {

    let dialogsData = [
        { id: 1, name: "Borya" },
        { id: 2, name: "Olga" },
        { id: 3, name: "Misha" },
        { id: 4, name: "George" },
        { id: 5, name: "Sacha" },
        { id: 6, name: "Tanya" }
    ]
    let dialogsElements= dialogsData.map(item=>{
        return <DialogItem name={item.name} id={item.id} />
    })

    let messagesData = [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you" },
        { id: 3, message: "yooo" },
        { id: 4, message: "byu" },
    ]
    let messagesElements= messagesData.map(item=>{
        return <Message message={item.message} id={item.id} />
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
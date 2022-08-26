import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css"

type DialogItemType = {
    name: string
    id: string
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

    let messagesData = [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you" },
        { id: 3, message: "yooo" },
        { id: 4, message: "byu" },
    ]

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                <DialogItem name={"Borya"} id={'1'} />
                <DialogItem name={"Olga"} id={'2'} />
                <DialogItem name={"Misha"} id={'3'} />
                <DialogItem name={"George"} id={'4'} />
            </div>
            <div className={s.messages}>
                <Message message="Hi" />
                <Message message="How are you" />
                <Message message="Buy" />
            </div>
        </div>
    )
}

export default Dialogs
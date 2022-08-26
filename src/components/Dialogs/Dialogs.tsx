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

const Message = (props: { message: string }) => {
    return (
        <div className={s.message}>{props.message}</div>

    )
}

const Dialogs = (props: any) => {
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
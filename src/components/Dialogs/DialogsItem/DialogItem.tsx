import React from "react";
import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css"

type DialogItemType = {
    name: string
    id: string | number
}

const DialogItem = (props: DialogItemType) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog}>
            <NavLink className={s.navLink} to={path} activeClassName={s.activeLink} >{props.name}</NavLink>
        </div>
    )
}



export default DialogItem
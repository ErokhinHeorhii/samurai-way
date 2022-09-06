import React from "react";
import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css"

type DialogItemType = {
    name: string
    id: string | number
    src: string
}

const DialogItem = (props: DialogItemType) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog}>
            <img className={s.imgForDialogs} src= {props.src} alt="img"></img>
            <NavLink className={s.navLink} to={path} activeClassName={s.activeLink} >{props.name}</NavLink>
        </div>
    )
}



export default DialogItem
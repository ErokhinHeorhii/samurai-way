import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css"

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                <div className={s.dialog}>
                 <NavLink  className={s.navLink + " " + s.active} to="/dialogs/1">Bory</NavLink> 
                </div>
                <div className={s.dialog}>
                <NavLink className={s.navLink} to="/dialogs/2">Igor</NavLink>
                </div>
                <div className={s.dialog}>
                <NavLink className={s.navLink} to="/dialogs/3">Andre</NavLink>
                </div>
                <div className={s.dialog}>
                <NavLink className={s.navLink} to="/dialogs/4">Olga</NavLink>
                </div>
            
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hi</div>
                <div className={s.message}>How ary you?</div>
                <div className={s.message}>Buy</div>
            </div>
        </div>
    )
}


export default Dialogs
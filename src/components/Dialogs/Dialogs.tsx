import React from "react";
import s from "./Dialogs.module.css"

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                <div className={s.dialog + " " + s.active}>
                    Bory
                </div>
                <div className={s.dialog}>
                  Igor
                </div>
                <div className={s.dialog}>
                  Andre
                </div>
                <div className={s.dialog}>
                  Poly
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
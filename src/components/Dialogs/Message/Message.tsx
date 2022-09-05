import React from "react";
import s from "./../Dialogs.module.css"


 export type myMessageType = {
    message: string
    id: string | number
}

const Message = (props: myMessageType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}


export default Message
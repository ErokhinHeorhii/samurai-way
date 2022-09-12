import React from "react";
import s from "./../Dialogs.module.css"


export type myMessageType = {
    message: string
    id: string | number
}

const Message = (props: myMessageType) => {
    return (<div>
        <li className={s.message}>{props.message}</li>
   
    </div>
    )
}


export default Message
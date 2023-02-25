import React from 'react'
import s from "./Message.module.css"
import like from "../../../assets/images/like.jpg";

export type TMessageData = {
    avatar: string
    name: string
    message: string
    time: string
}

function Message(props: any) {
    return (
        <div className={s.wrapper}>
            <div className={s.item}>
                <div className={s.itemAvatar}>
                    <img src={props.avatar} className={s.itemImage} alt={"img"}></img>
                </div>
                <div className={s.itemDialog}>
                    <div className={s.itemPost}>
                        {props.message}
                    </div>
                    <div className={s.itemTime}> {props.time}</div>
                </div>

            </div>
            <div className={s.wrapperLikeCount}> {props.likeCounts}
                <img src={like} alt={"img"} className={s.imgLike}></img>
            </div>

        </div>
    )
}

export default Message

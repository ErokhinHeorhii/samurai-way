import React from "react"
import s from "./Users.module.css"
import avatar from "../../assets/images/avatar.png"
import {UsersType} from "../Redux/UsersReducer"
import {NavLink} from "react-router-dom";

export type NewUsersPropsType = {
    isFollowingInProgress: number[]
    followSuccessThunkCreator: any
    unFollowSuccessThunkCreator: any
    user: UsersType
}

const User = (props: NewUsersPropsType) => {

    const {
        unFollowSuccessThunkCreator,
        isFollowingInProgress, followSuccessThunkCreator, user, ...restProps
    } = props


    return (
        <div>
            <div className={s.wrapperPage}>
            </div>
            {
                <div className={s.wrapperItem}>
                    <div className={s.wrapperImageButton}>
                        <div className={s.wrapperImage}>
                            <NavLink to={'/profile/' + user.id}>
                                <img className={s.image}
                                     src={user.photos.small !== null ? user.photos.small : avatar}
                                     alt="img"/>
                            </NavLink>
                        </div>
                        <div>
                            {
                                user.followed
                                    ?
                                    <button disabled={isFollowingInProgress.some(el => el === user.id)} onClick={() => {
                                        /*вызываеем санккреэйтор */
                                        unFollowSuccessThunkCreator(user.id)
                                    }}> Unfollow</button>
                                    :
                                    <button disabled={isFollowingInProgress.some(el => el === user.id)} onClick={() => {
                                        followSuccessThunkCreator(user.id)
                                    }}> Follow </button>
                            }
                        </div>
                    </div>
                    <div className={s.wrapperDialog}>
                        <div className={s.wrapperName}>
                            <span>{user.name} {user.status} </span>
                            <div className={s.text}>{user.uniqueUrlName}</div>
                        </div>
                        <div className={s.wrapperContry}>
                            <div>{"item.location.city"},</div>
                            <div>{"item.location.contry"}</div>
                        </div>
                    </div>
                </div>
            }
        </div>)
}

export default User
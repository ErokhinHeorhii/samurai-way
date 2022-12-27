import React from "react"
import s from "./Users.module.css"
import {UsersType} from "../Redux/UsersReducer"
import {Pagination} from "../common/pagination/Pagination";
import User from "./User";

export type NewUsersPropsType = {
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    isFollowingInProgress: number[]
    followSuccessThunkCreator: any
    unFollowSuccessThunkCreator: any
}

const Users = (props: NewUsersPropsType) => {

    const {
        totalUsersCount, pageSize, currentPage, onPageChanged, users, unFollowSuccessThunkCreator,
         isFollowingInProgress, followSuccessThunkCreator, ...restProps
    } = props

    return (
        <div>
            <div className={s.wrapperPage}>
                <Pagination currentPage={currentPage}
                            onPageChanged={onPageChanged}
                            pageSize={pageSize}
                            totalUsersCount={totalUsersCount}
                />
            </div>
            {
                users.map(item => {
                    return <User key={item.id}
                                 isFollowingInProgress={isFollowingInProgress}
                                 followSuccessThunkCreator={followSuccessThunkCreator}
                                 unFollowSuccessThunkCreator={unFollowSuccessThunkCreator}
                                 user={item}
                    />
                })
            }
        </div>)
}

export default Users
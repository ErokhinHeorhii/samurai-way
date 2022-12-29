import React from "react"
import s from "./Users.module.css"
import {UsersType} from "../Redux/UsersReducer"
import {Pagination} from "../common/pagination/Pagination";
import User from "./User";

export type NewUsersPropsType = {
    onPageChanged: (pageNumber: number) => void
    totalItemsCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    isFollowingInProgress: number[]
    followSuccessThunkCreator: any
    unFollowSuccessThunkCreator: any
    portionSize: number
}

const Users = (props: NewUsersPropsType) => {

    const {
        totalItemsCount, pageSize, currentPage, onPageChanged, users, unFollowSuccessThunkCreator,
        isFollowingInProgress, followSuccessThunkCreator, portionSize, ...restProps
    } = props

    return (
        <div className={s.wrapperForPaginationUsers}>
            <div className={s.wrapperPage}>
                <Pagination currentPage={currentPage}
                            onPageChanged={onPageChanged}
                            pageSize={pageSize}
                            totalItemsCount={totalItemsCount}
                            portionSize={portionSize}
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
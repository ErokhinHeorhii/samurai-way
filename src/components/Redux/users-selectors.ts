import {AllAppStateType} from "./RedaxStore";
import {UsersType} from "./UsersReduser";
import {createSelector} from "reselect";

// state:AllAppStateType
// UsersType[]

export const  getUsers=(state:AllAppStateType):UsersType[] =>{
    return state.usersPage.users
}

export const getUsersSelector = createSelector(getUsers, (users:UsersType[])=>{
    return users
})

 export const getPageSize=(state:AllAppStateType): number =>{
    return state.usersPage.pageSize
}

export const getTotalUsersCount=(state:AllAppStateType): number => {
    return state.usersPage.totalUsersCount

}

export const getСurrentPage=(state:AllAppStateType): number => {
    return state.usersPage.currentPage

}

export const getIsFetching=(state:AllAppStateType): boolean => {
    return state.usersPage.isFetching

}

export const getIsFollowingInProgress=(state:AllAppStateType): number[] => {
    return state.usersPage.followingInProgress

}






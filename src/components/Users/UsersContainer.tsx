import React from "react"
import {connect} from "react-redux"
// import {Dispatch} from "redux"
import {AllAppStateType, AppThunk} from "../Redux/RedaxStore"
import {
    ActionTypeForUserReduser,
    followAC, followSuccessThunkCreator, getUsersThunkCreator,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    toggleIsFetchingAC, toggleIsFollowingAC,
    unfollowAC, unFollowSuccessThunkCreator,
    UsersType
} from "../Redux/UsersReduser"
import Users from "./Users"
import s from "./Users.module.css"
import Preloader from "../common/preloader/Preloader"
import {userApi} from "../../api/Api";
import {ThunkAction} from "redux-thunk";
import {ActionTypeForAuthReduser} from "../Redux/HeaderAuthReduser";
import {Dispatch} from "redux";

export type MapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    isFollowingInProgress: number[]
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    // setUsers: (users: UsersType[]) => void
    // setCurrentPage: (currentPage: number) => void
    // setTotalUsersCount: (totalUsersCount: number) => void
    // toggleIsFetching: (isFetching: boolean) => void
    toggleIsFollowingInProgress: (isFollowing: boolean, userId:number) => void
    getUsersThunkCreator:(currentPage: number, pageSize: number)=>void
    followSuccessThunkCreator:(userId: number)=>void
    unFollowSuccessThunkCreator:(userId: number)=>void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

export class UsersApiComponent extends React.Component<UsersPropsType> {
    constructor(props: UsersPropsType) {
      super(props)
    }

    // метод вызывается после вмонтирования компоненты в DOM
    componentDidMount(): void {
        /*используем санки для запроса к серверу*/
        this.props.getUsersThunkCreator(this.props.currentPage,this.props.pageSize)

        // this.props.toggleIsFetching(true)
        // userApi.getUsers(this.props.currentPage, this.props.pageSize)
        //     /*вынесли запрос в файл api.js в функцию getUsers*/
        //     .then(data => {
        //         this.props.toggleIsFetching(false)
        //         this.props.setUsers(data.items)
        //         this.props.setTotalUsersCount(Math.ceil(data.totalCount / 350))
        //     })
    }

    onPageChanged = (pageNumber: number) => {

        /*используем санки для запроса к серверу*/
        this.props.getUsersThunkCreator(pageNumber,this.props.pageSize)
        // this.props.setCurrentPage(pageNumber)
        // this.props.toggleIsFetching(true)
        // // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, {withCredentials:true})
        // userApi.getUsers(pageNumber, this.props.pageSize)
        //     .then(data => {
        //         console.log(data)
        //         this.props.toggleIsFetching(false)
        //         this.props.setUsers(data.items)
        //     })
    }

    render() {
        return <div className={s.wrapperUsers}>
            {this.props.isFetching
                ? <>
                    <Preloader/>
                </>
                : <Users
                    onPageChanged={this.onPageChanged}
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    follow={this.props.follow}
                    unFollow={this.props.unFollow}
                    // toggleIsFollowingInProgress={this.props.toggleIsFollowingInProgress}
                    isFollowingInProgress={this.props.isFollowingInProgress}
                    followSuccessThunkCreator={this.props.followSuccessThunkCreator}
                    unFollowSuccessThunkCreator={this.props.unFollowSuccessThunkCreator}
                />}

        </div>
    }
}

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowingInProgress:state.usersPage.followingInProgress
    }
}

/*let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
           follow: (userId: number) => {
             dispatch(followAC(userId))
           },
           unFollow: (userId: number) => {
             dispatch(unfollowAC(userId))
           },
           setUsers: (users: UsersType[]) => {
             dispatch(setUsersAC(users))
           },
           setCurrentPage: (currentPage: number) => {
             dispatch(setCurrentPageAC(currentPage))
           },
           setTotalUsersCount: (totalUsersCount: number) => {
             dispatch(setTotalUsersCountAC(totalUsersCount))
           },
           toggleIsFetching: (isFetching: boolean) => {
             dispatch(toggleIsFetchingAC(isFetching))
           }

    }
}*/
//    в случа когда мы передаем в connect обьект под копотом connect доставляет dispatch
export default connect(mapStateToProps, {
    follow: followAC,
    unFollow: unfollowAC,
    // setUsers: setUsersAC,
    // setCurrentPage: setCurrentPageAC,
    // setTotalUsersCount: setTotalUsersCountAC,
    // toggleIsFetching: toggleIsFetchingAC,
    toggleIsFollowingInProgress: toggleIsFollowingAC,
    getUsersThunkCreator:getUsersThunkCreator,
    followSuccessThunkCreator:followSuccessThunkCreator,
    unFollowSuccessThunkCreator: unFollowSuccessThunkCreator
})(UsersApiComponent)
// (...params) => dispatch(getUsersThunkCreator(...params))
// typeof action === 'function': action(dispatch)
// dispatch(action)
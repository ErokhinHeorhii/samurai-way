import React from "react"
import {connect} from "react-redux"
import {AllAppStateType} from "../Redux/RedaxStore"
import {
    followAC, followSuccessThunkCreator, getUsersThunkCreator,
    toggleIsFollowingAC,
    unfollowAC, unFollowSuccessThunkCreator,
    UsersType
} from "../Redux/UsersReducer"
import Users from "./Users"
import s from "./Users.module.css"
import Preloader from "../common/preloader/Preloader"
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/WithAuthRedirectComponent";
import {
    getIsFetching, getIsFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
     getUsersSelector,
    getСurrentPage,
} from "../Redux/users-selectors";

export type MapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    isFollowingInProgress: number[]
}

type MapDispatchToPropsType = {
    toggleIsFollowingInProgress: (isFollowing: boolean, userId: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    followSuccessThunkCreator: (userId: number) => void
    unFollowSuccessThunkCreator: (userId: number) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

export class UsersApiComponent extends React.Component<UsersPropsType> {
    constructor(props: UsersPropsType) {
        super(props)
    }

    // метод вызывается после вмонтирования компоненты в DOM
    componentDidMount(): void {
        let {currentPage, pageSize, getUsersThunkCreator }= this.props
        getUsersThunkCreator(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        let {getUsersThunkCreator, pageSize }= this.props
        /*используем санки для запроса к серверу*/
        getUsersThunkCreator(pageNumber, pageSize)
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
                    isFollowingInProgress={this.props.isFollowingInProgress}
                    followSuccessThunkCreator={this.props.followSuccessThunkCreator}
                    unFollowSuccessThunkCreator={this.props.unFollowSuccessThunkCreator}
                />}
        </div>
    }
}

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        //переписал на селекторы
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getСurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingInProgress(state)
    }
}
// let AuthRedirectComponent = withAuthRedirect(UsersApiComponent)

//    в случа когда мы передаем в connect обьект под копотом connect доставляет dispatch
//  connect(mapStateToProps, {
//     follow: followAC,
//     unFollow: unfollowAC,
//     // setUsers: setUsersAC,
//     // setCurrentPage: setCurrentPageAC,
//     // setTotalUsersCount: setTotalUsersCountAC,
//     // toggleIsFetching: toggleIsFetchingAC,
//     toggleIsFollowingInProgress: toggleIsFollowingAC,
//     getUsersThunkCreator:getUsersThunkCreator,
//     followSuccessThunkCreator:followSuccessThunkCreator,
//     unFollowSuccessThunkCreator: unFollowSuccessThunkCreator
// })(AuthRedirectComponent)
// (...params) => dispatch(getUsersThunkCreator(...params))
// typeof action === 'function': action(dispatch)
// dispatch(action)

//добавили финкцию compose  и зарефакторили с ее помощью
export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow: followAC,
        unFollow: unfollowAC,
        toggleIsFollowingInProgress: toggleIsFollowingAC,
        getUsersThunkCreator: getUsersThunkCreator,
        followSuccessThunkCreator: followSuccessThunkCreator,
        unFollowSuccessThunkCreator: unFollowSuccessThunkCreator
    }),
    withAuthRedirect
)(UsersApiComponent)
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { AllAppStateType } from "../Redux/RedaxStore"
import { followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC, UsersType } from "../Redux/UsersReduser"
import { Users } from "./UsersOnClass"

export type MapStateToPropsType = {
  users: UsersType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
}

type MapDispatchToPropsType = {
  follow: (userId: number) => void
  unFollow: (userId: number) => void
  setUsers: (users: UsersType[]) => void
  setCurrentPage: (currentPage: number) => void
  setTotalUsersCount: (totalUsersCount: number) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType
let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
  }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
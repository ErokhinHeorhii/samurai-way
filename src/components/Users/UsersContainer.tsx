import axios from "axios"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { AllAppStateType } from "../Redux/RedaxStore"
import { followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC, UsersType } from "../Redux/UsersReduser"
import Users from "./Users"

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


export class UsersApiComponent extends React.Component<UsersPropsType> {
  // constructor(props: UsersPropsType) {
  //   super(props)
  // }
  // метод вызывается после вмонтирования компоненты в DOM

  componentDidMount(): void {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then(res => {
        this.props.setUsers(res.data.items)
        this.props.setTotalUsersCount(Math.ceil(res.data.totalCount / 350))
      })
  }

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then(res => {
        this.props.setUsers(res.data.items)
      })
  }

  render() {
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
    let pagesArr = []
    for (let i = 1; i <= pagesCount; i++) {
      pagesArr.push(i)
    }
    console.log(pagesArr)


    return <Users
      onPageChanged={this.onPageChanged}
      totalUsersCount={this.props.totalUsersCount}
      pageSize={this.props.pageSize}
      currentPage={this.props.currentPage}
      users={this.props.users}
      follow={this.props.follow}
      unFollow={this.props.unFollow}
    />
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(UsersApiComponent)
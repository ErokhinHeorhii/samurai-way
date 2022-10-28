import { connect } from "react-redux"
import { Dispatch } from "redux"
import { AllAppStateType } from "../Redux/RedaxStore"
import { followAC, setUsersAC, unfollowAC, UsersType } from "../Redux/UsersReduser"
import { Users } from "./UsersOnClass"

export type MapStateToPropsType = {
  users: UsersType[]
}

type MapDispatchToPropsType = {
  follow: (userId: number) => void
  unFollow: (userId: number) => void
  setUsers: (users: UsersType[]) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType
let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
  return {
    users: state.usersPage.users
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
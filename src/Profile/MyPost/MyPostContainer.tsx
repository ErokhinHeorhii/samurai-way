import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { addPostActionCreater }
from '../../components/Redux/ProfileReducer'
import { AllAppStateType } from '../../components/Redux/RedaxStore'
import MyPost, { myPostType } from './MyPost'

type MapStateToPropsType = {
  posts: myPostType[]
}

type MapDispatchToPropsType = {
  addPost: (newPostText:string) => void
}

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts
  }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {

    addPost: (newPostText:string) => {
      dispatch(addPostActionCreater(newPostText))
    }
  }
}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)

export default MyPostContainer

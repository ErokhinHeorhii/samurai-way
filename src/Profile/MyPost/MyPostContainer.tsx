import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { addPostActionCreater, updateNewPostTextActionCreater } from '../../components/Redux/ProfileReduser'
import { AllAppStateType } from '../../components/Redux/RedaxStore'
import MyPost, { myPostType } from './MyPost'

// export type myPostType = {
//   id: number
//   message: string
//   likeCount: number
// }

// export type NewPostDataTypeForReduser = {
//   posts: myPostType[]
//   newPostText: string
// }

// export type postDataType = NewPostDataTypeForReduser & {
//   posts: myPostType[]
//   newPostText: string
//   dispatch: (action: AllActionType
//   ) => void
// }

// const MyPostContainer = (props: postDataType) => {
//   const {
//     posts,
//     dispatch,
//     newPostText,
//   } = props


//   const addPost = () => {
//     // addPost()
//     dispatch(addPostActionCreater())
//   }

//   const onPostChange = (text: string) => {
//     // let text = newPostElement.current ? newPostElement.current.value : " "
//     // updateNewPostText(text)
//     dispatch(updateNewPostTextActionCreater(text))
//   }

//   return (
//     <MyPost
//       updateNewPostText={onPostChange}
//       addPost={addPost}
//       posts={posts}
//       newPostText={newPostText}
//     />
//   )
// }
type MapStateToPropsType = {
  posts: myPostType[]
  newPostText: string
}

type MapDispatchToPropsType = {
  updateNewPostText: (text: string) => void
  addPost: () => void
}


let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    updateNewPostText: (text: string) => {
      dispatch(updateNewPostTextActionCreater(text))
    },
    addPost: () => {
      dispatch(addPostActionCreater())
    }
  }
}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)


export default MyPostContainer
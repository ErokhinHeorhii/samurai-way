// import { postPageType } from '../App'

// import { AddMessageType, UpdateNewMessageTextType } from '../components/Redux/DialogReduser'
// import { AddPostActionType, UpdateNewPostTextActionType } from '../components/Redux/ProfileReduser'
// import { myPostType } from './MyPost/MyPost'
import MyPostContainer from './MyPost/MyPostContainer'
import ProfileInfo from './ProfileInfo.tsx/ProfileInfo'

// export type postPageType = {
//   postsData: {
//     posts: myPostType[]
//     newPostText: string
//   }
//   // addPost: () => void
//   // updateNewPostText: (newText: string) => void
//   dispatch: (action:
//     AddPostActionType |
//     UpdateNewPostTextActionType |
//     UpdateNewMessageTextType |
//     AddMessageType
//   ) => void
// }

const Profile = () => {
  // const { posts, newPostText } = props.postsData
  // const { addPost, updateNewPostText } = props
  // const { dispatch } = props

  return (<div >
    <ProfileInfo />
    < MyPostContainer
      // posts={posts}
      // // addPost={addPost}
      // newPostText={newPostText}
      // // updateNewPostText={updateNewPostText} 
      // dispatch={dispatch}
    />

  </div>)
}
export default Profile
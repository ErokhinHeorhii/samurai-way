// import { postPageType } from '../App'

import { AddMessageType, UpdateNewMessageTextType } from '../components/Redux/DialogReduser'
import { AddPostActionType, UpdateNewPostTextActionType } from '../components/Redux/ProfileReduser'
import MyPost, { myPostType } from './MyPost/MyPost'
import ProfileInfo from './ProfileInfo.tsx/ProfileInfo'

export type postPageType = {
  postsData: {
    posts: myPostType[]
    newPostText: string
  }
  // addPost: () => void
  // updateNewPostText: (newText: string) => void
  dispatch: (action: AddPostActionType |
    UpdateNewPostTextActionType |
    UpdateNewMessageTextType |
    AddMessageType
  ) => void
}

const Profile = (props: postPageType) => {
  const { posts, newPostText } = props.postsData
  // const { addPost, updateNewPostText } = props
  const { dispatch } = props

  return (<div >
    <ProfileInfo />
    < MyPost posts={posts}
      // addPost={addPost}
      newPostText={newPostText}
      // updateNewPostText={updateNewPostText} 
      dispatch={dispatch}
    />

  </div>)
}
export default Profile
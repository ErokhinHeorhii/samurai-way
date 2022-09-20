// import { postPageType } from '../App'
import MyPost, { myPostType } from './MyPost/MyPost'
import ProfileInfo from './ProfileInfo.tsx/ProfileInfo'

export type postPageType = {
  postsData: {
    posts: myPostType[]
    newPostText: string
  }
  addPost: () => void
  updateNewPostText: (newText: string) => void
}

const Profile = (props: postPageType) => {
  const { posts, newPostText } = props.postsData
  const { addPost, updateNewPostText } = props

  return (<div >
    <ProfileInfo />
    < MyPost posts={posts} addPost={addPost}
      newPostText={newPostText}
      updateNewPostText={updateNewPostText} />

  </div>)
}
export default Profile
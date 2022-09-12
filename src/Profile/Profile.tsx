import { postPageType } from '../App'
import MyPost from './MyPost/MyPost'
import ProfileInfo from './ProfileInfo.tsx/ProfileInfo'

const Profile = (props:postPageType) => {
const {posts} = props.postsData

  return (<div >
    <ProfileInfo/>
    < MyPost posts={posts} addPost={props.addPost}/>

  </div>)
}
export default Profile
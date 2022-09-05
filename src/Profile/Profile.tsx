import MyPost, { postDataType } from './MyPost/MyPost'
import ProfileInfo from './ProfileInfo.tsx/ProfileInfo'

const Profile = (props:postDataType) => {
const {postsData} = props
 
  return (<div >
    <ProfileInfo/>
    < MyPost postsData={postsData} />

  </div>)
}
export default Profile
import MyPost from './MyPost/MyPost'
import ProfileInfo from './ProfileInfo.tsx/ProfileInfo'

const Profile = () => {

  let postsData = [
    { id: 1, message: "Hi", likeCount: 10 },
    { id: 2, message: "How are you", likeCount: 2 },
    { id: 3, message: "yooo", likeCount: 4 }
 
  ]

  return (<div >
    <ProfileInfo/>
    < MyPost postsData={postsData} />

  </div>)
}
export default Profile
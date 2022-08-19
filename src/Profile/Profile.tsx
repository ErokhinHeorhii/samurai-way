import MyPost from './MyPost/MyPost'
import s from './Profile.module.css'

const Profile = () => {
  return (<div className={`${s.content} ${s.active}`}>
    <div>
      <img
        className={s.Image}
        src="https://klike.net/uploads/posts/2019-06/1561526578_1.jpg"
        alt="img" ></img>
    </div>
    <div>
      + discription
    </div>
    < MyPost />
  </div>)
}
export default Profile
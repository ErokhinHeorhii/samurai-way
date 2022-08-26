import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
  return (<div >
    <div >
      <img
        className={s.Image}
        src="https://klike.net/uploads/posts/2019-06/1561526578_1.jpg"
        alt="img" ></img>
    </div>
    <div className={s.discriptionBlock}>
      + discription
    </div>


  </div>)
}
export default ProfileInfo
import s from './ProfileInfo.module.css'
import {ProfilePageType} from "../../components/Redux/ProfileReduser";
import Preloader from "../../components/common/preloader/Preloader";

type PropsType = {
    profile: ProfilePageType
}
const ProfileInfo = (props: PropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (<div>
        <div>
            <img
                className={s.Image}
                src="https://klike.net/uploads/posts/2019-06/1561526578_1.jpg"
                alt="img"></img>
        </div>
        <div className={s.discriptionBlock}>
            <div className={s.wrapperImage}>
                <img className={s.avatarImage} src={props.profile.photos.small}/>

            </div>
            <span className={s.wrapperName}>{props.profile.fullName}
                {props.profile.lookingForAJob
                    ? <div className={s.lookingJob}> Looking for Job - YES </div>
                    : <div className={s.lookingJob}> Looking for Job - No </div>
                }</span>

        </div>


    </div>)
}
export default ProfileInfo
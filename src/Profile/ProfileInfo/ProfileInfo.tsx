import s from './ProfileInfo.module.css'
import {ProfilePageType} from "../../components/Redux/ProfileReducer";
import Preloader from "../../components/common/preloader/Preloader";
import avatarProfile from "../../assets/images/AvatarForProfile.jpg"
import ProfileStatusWithHooks from "./ProfileStatusWithHook";

type PropsType = {
    profile: ProfilePageType
    status: string
    updateStatusThunkCreator: (status: string) => void
}
const ProfileInfo = ({profile, status, updateStatusThunkCreator}: PropsType) => {
    if (!profile) {
        return <div>
            <img
                className={s.Image}
                src="https://klike.net/uploads/posts/2019-06/1561526578_1.jpg"
                alt="img"></img>
            <Preloader/>
        </div>
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
                <img className={s.avatarImage} src={profile.photos.small == null
                    ? avatarProfile
                    : profile.photos.small}/>
            </div>
            <span className={s.wrapperName}>{profile.fullName}
                {profile.lookingForAJob
                    ? <div className={s.lookingJob}> Looking for Job : YES </div>
                    : <div className={s.lookingJob}> Looking for Job : No </div>
                }</span>

        </div>
        <ProfileStatusWithHooks status={status} updateStatusThunkCreator={updateStatusThunkCreator}/>

    </div>)
}
export default ProfileInfo
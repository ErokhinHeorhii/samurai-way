import s from './ProfileInfo.module.css'
import {ProfilePageType, savePhotoThunkCreator} from "../../components/Redux/ProfileReducer";
import Preloader from "../../components/common/preloader/Preloader";
import avatarProfile from "../../assets/images/AvatarForProfile.jpg"
import ProfileStatusWithHooks from "./ProfileStatusWithHook";
import {ChangeEvent} from "react";

type PropsType = {
    profile: ProfilePageType
    status: string
    updateStatusThunkCreator: (status: string) => void
    isOwner: boolean
    savePhotoThunkCreator:(file:any)=>void
}
const ProfileInfo = ({profile, status, updateStatusThunkCreator, isOwner, savePhotoThunkCreator}: PropsType) => {
    if (!profile) {
        return <div>
            <img
                className={s.Image}
                src="https://klike.net/uploads/posts/2019-06/1561526578_1.jpg"
                alt="img"></img>
            <Preloader/>
        </div>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>): void => {
        debugger
        if (e.target.files) {
            savePhotoThunkCreator(e.target.files[0])
        }
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
            <span className={s.wrapperName}> {profile.fullName}
                {profile.lookingForAJob
                    ? <div className={s.lookingJob}> Looking for Job : YES </div>
                    : <div className={s.lookingJob}> Looking for Job : No </div>
                }</span>

        </div>
        {isOwner && <input className={s.wrapperInput} type={"file"} onChange={onMainPhotoSelected}/>}
        <ProfileStatusWithHooks status={status} updateStatusThunkCreator={updateStatusThunkCreator}/>
    </div>)
}
export default ProfileInfo
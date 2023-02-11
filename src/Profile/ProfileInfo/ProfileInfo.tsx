import s from './ProfileInfo.module.css'
import {ProfilePageType} from "../../components/Redux/ProfileReducer";
import Preloader from "../../components/common/preloader/Preloader";
import avatarProfile from "../../assets/images/AvatarForProfile.jpg"
import ProfileStatusWithHooks from "./ProfileStatusWithHook";
import React, {ChangeEvent, useEffect, useState} from "react";
import ProfileProfileDataFormReduxForm, {FormDataType} from "./ProfileDataForm";


type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
type ProfileDataPropsType = {
    profile: ProfilePageType
    isOwner?: boolean
    goToEditMode?: () => void
}
type ProfileInfoPropsType = {
    profile: ProfilePageType
    status: string
    updateStatusThunkCreator: (status: string) => void
    isOwner: boolean
    savePhotoThunkCreator: (file: any) => void
    saveProfileThunkCreator: (formData: FormDataType) => void
    isErrorContacts: boolean
}
const ProfileInfo = ({
                         profile,
                         status,
                         updateStatusThunkCreator,
                         isOwner,
                         savePhotoThunkCreator,
                         saveProfileThunkCreator,
                         isErrorContacts
                     }: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [onSubmitHandler, setonSubmitHandler] = useState<boolean>(false)

    useEffect(() => {
        if (!isErrorContacts) {
            setEditMode(false)
        }  else {
            setEditMode(true)
        }

    }, [isErrorContacts, onSubmitHandler])

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
        if (e.target.files) {
            savePhotoThunkCreator(e.target.files[0])
        }
    }

    const onSubmit = (formData: FormDataType) => {
        saveProfileThunkCreator(formData)
        setonSubmitHandler(!onSubmitHandler)
    }

    return (
        <div>
            <div>
                <img
                    className={s.Image}
                    src="https://klike.net/uploads/posts/2019-06/1561526578_1.jpg"
                    alt="img"></img>
            </div>
            {editMode ?
                <ProfileProfileDataFormReduxForm initialValues={profile} profile={profile}
                                                 onSubmit={onSubmit}/> :
                <ProfileData profile={profile} isOwner={isOwner}
                             goToEditMode={() => setEditMode(true)}/>}
            <ProfileStatusWithHooks status={status} updateStatusThunkCreator={updateStatusThunkCreator}/>
            {isOwner && <input className={s.wrapperInput} type={"file"} onChange={onMainPhotoSelected}/>}
        </div>)
}

export const Contact = ({contactTitle, contactValue}: ContactsPropsType) => {
    return (<div>
        <div className={s.contacts}><b>{contactValue && contactTitle + ":"}</b> {contactValue}</div>
    </div>)
}

export const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {

    return (<div className={s.discriptionBlock}>
        <div className={s.wrapperImage}>
            <img className={s.avatarImage} src={profile!.photos.small == null
                ? avatarProfile
                : profile!.photos.small} alt={"img"}/>
            {isOwner && <button onClick={goToEditMode}>edit</button>}
        </div>
        <span className={s.wrapperName}> <b>Full Name</b> : {profile!.fullName}
            {profile!.lookingForAJob
                ? <div className={s.lookingJob}><b>Looking for Job</b> : YES </div>
                : <div className={s.lookingJob}><b>Looking for Job</b> : No </div>
            }
            {profile!.lookingForAJobDescription &&
                <span className={s.lookingJob}>
                            <b>Profession Skills</b>: {profile!.lookingForAJobDescription}
                        </span>
            }
            <div className={s.lookingJob}>
                <div className={s.lookingJob}>
                <b>About me</b>:{profile!.aboutMe}
            </div>
                    <b>Contacts</b>:{Object.keys(profile!.contacts)
                .map((item) => <Contact key={item} contactTitle={item}
                                        contactValue={
                                            profile!.contacts[item as keyof ContactsType]}/>)}
            </div>
        </span>
    </div>)
}

export default ProfileInfo
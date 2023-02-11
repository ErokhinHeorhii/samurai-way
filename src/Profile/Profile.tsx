import MyPostContainer from './MyPost/MyPostContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {ProfilePageType} from "../components/Redux/ProfileReducer";
import React from "react";
import {FormDataType} from "./ProfileInfo/ProfileDataForm";

type PropsType = {
    profile: ProfilePageType
    status: string
    updateStatusThunkCreator: (status: string) => void
    isOwner: boolean
    savePhotoThunkCreator:(file:string)=>void
    saveProfileThunkCreator:(formData:FormDataType)=>void
    isErrorContacts:boolean
}

const Profile = (props: PropsType) => {

    return (<div>
        <ProfileInfo profile={props.profile} status={props.status}
                     updateStatusThunkCreator={props.updateStatusThunkCreator}
                     isOwner={props.isOwner}
                     savePhotoThunkCreator={props.savePhotoThunkCreator}
                     saveProfileThunkCreator={props.saveProfileThunkCreator}
                     isErrorContacts={props.isErrorContacts}
        />
        < MyPostContainer/>

    </div>)
}
export default Profile
import MyPostContainer from './MyPost/MyPostContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {ProfilePageType} from "../components/Redux/ProfileReducer";
import React from "react";


type PropsType = {
    profile: ProfilePageType
    status: string
    updateStatusThunkCreator: (status: string) => void
    isOwner: boolean
    savePhotoThunkCreator:(file:string)=>void
}


const Profile = (props: PropsType) => {

    return (<div>
        <ProfileInfo profile={props.profile} status={props.status}
                     updateStatusThunkCreator={props.updateStatusThunkCreator}
                     isOwner={props.isOwner}
                     savePhotoThunkCreator={props.savePhotoThunkCreator}
        />
        < MyPostContainer/>

    </div>)
}
export default Profile
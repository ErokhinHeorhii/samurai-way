// import { postPageType } from '../App'

// import { AddMessageType, UpdateNewMessageTextType } from '../components/Redux/DialogReduser'
// import { AddPostActionType, UpdateNewPostTextActionType } from '../components/Redux/ProfileReduser'
// import { myPostType } from './MyPost/MyPost'
import MyPostContainer from './MyPost/MyPostContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {ProfilePageType, updateStatusThunkCreator} from "../components/Redux/ProfileReduser";
import {Redirect, withRouter} from "react-router-dom";
import React from "react";

// export type postPageType = {
//   postsData: {
//     posts: myPostType[]
//     newPostText: string
//   }
//   // addPost: () => void
//   // updateNewPostText: (newText: string) => void
//   dispatch: (action:
//     AddPostActionType |
//     UpdateNewPostTextActionType |
//     UpdateNewMessageTextType |
//     AddMessageType
//   ) => void
// }

type PropsType = {
    profile: ProfilePageType
    status: string
    updateStatusThunkCreator: (status: string) => void
}


const Profile = (props: PropsType) => {

    return (<div>
        <ProfileInfo profile={props.profile} status ={props.status}
                     updateStatusThunkCreator ={props.updateStatusThunkCreator}/>
        < MyPostContainer

        />

    </div>)
}
export default Profile
// import { postPageType } from '../App'

// import { AddMessageType, UpdateNewMessageTextType } from '../components/Redux/DialogReduser'
// import { AddPostActionType, UpdateNewPostTextActionType } from '../components/Redux/ProfileReduser'
// import { myPostType } from './MyPost/MyPost'
import MyPostContainer from './MyPost/MyPostContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {ProfilePageType} from "../components/Redux/ProfileReduser";
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

 type PropsType={
    profile:ProfilePageType
}


const Profile = (props:PropsType) => {

    return (<div>
        <ProfileInfo profile={props.profile}/>
        < MyPostContainer

        />

    </div>)
}
export default Profile
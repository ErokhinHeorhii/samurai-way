import MyPostContainer from './MyPost/MyPostContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {ProfilePageType, updateStatusThunkCreator} from "../components/Redux/ProfileReduser";
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
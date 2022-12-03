import {
    myPostType,
} from "../../Profile/MyPost/MyPost";
import {Dispatch} from "redux";
import {profileApi, userApi} from "../../api/Api";
import {followAC, toggleIsFollowingAC} from "./UsersReduser";
import {AppThunk} from "./RedaxStore";
import profile from "../../Profile/Profile";
import {v1} from "uuid";

export const ADD_POST = "ADD-POST";
export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
export const SET_USER_PROFILE = "SET_USER_PROFILE"
export const SET_STATUS = "SET_STATUS"

export type AddPostACType = ReturnType<typeof addPostActionCreater>;
export type SetUserProfileACType = ReturnType<typeof setUserProfile>;
export type SetStatusACType = ReturnType<typeof setStatusAC>
export type ActionTypeForProfileReducer =
    AddPostACType |
    SetUserProfileACType |
    SetStatusACType

export type ProfilePageType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
} | null

export type InitialStateTypeForProfile = {
    posts: myPostType[]
    profile: ProfilePageType
    status: string
}

let initialState = {
    posts: [
        {id: v1(), message: "Hi", likeCount: 10},
        {id: v1(), message: "How are you", likeCount: 2},
        {id: v1(), message: "yooo", likeCount: 4},
    ],
    profile: null,
    status: "Hello"
}

const ProfileReducer = (
    state: InitialStateTypeForProfile = initialState,
    action: ActionTypeForProfileReducer
): InitialStateTypeForProfile => {
    switch (action.type) {
        case ADD_POST: {

            const newPost: myPostType = {
                id: v1(),
                message: action.newPostText,
                likeCount: 5,
            };
            let newState = {...state, posts: [newPost, ...state.posts]}

            return newState;
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }

        }
        default:
            return state;
    }
};

export const addPostActionCreater = (newPostText: string) => ({type: ADD_POST, newPostText} as const);

// export const updateNewPostTextActionCreater = (text: string) =>
//     ({
//         type: UPDATE_NEW_POST_TEXT,
//         newText: text,
//     } as const);

export const setUserProfile = (profile: ProfilePageType) =>
    ({
        type: SET_USER_PROFILE,
        profile: profile,
    } as const);

export const setStatusAC = (status: string) => {
    return {type: SET_STATUS, status} as const
}


export const getProfileThunkCreator = (userId: string): AppThunk => {
    return (dispatch: Dispatch<ActionTypeForProfileReducer>) => {

        userApi.getProfile(userId)
            .then(res => {
                dispatch(setUserProfile(res.data))
            })
    }
}
export const getStatusThunkCreator = (userId: string): AppThunk => {
    return (dispatch: Dispatch<ActionTypeForProfileReducer>) => {

        profileApi.getStatus(userId)
            .then(res => {
                dispatch(setStatusAC(res.data))
            })
    }
}

export const updateStatusThunkCreator = (status: string): AppThunk => {
    return (dispatch: Dispatch<ActionTypeForProfileReducer>) => {

        profileApi.updateStatus(status)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setStatusAC(status))
                }
            })
    }

}
export default ProfileReducer;

import {
    myPostType,
} from "../../Profile/MyPost/MyPost";
import {Dispatch} from "redux";
import {profileApi, userApi} from "../../api/Api";
import {AppDispatch, AppRootStateType, AppThunk} from "./RedaxStore";
import {v1} from "uuid";
import {FormDataType} from "../../Profile/ProfileInfo/ProfileDataForm";
import {stopSubmit} from "redux-form";

export const ADD_POST = "profile/ADD-POST";
export const UPDATE_NEW_POST_TEXT = "profile/UPDATE-NEW-POST-TEXT";
export const SET_USER_PROFILE = "profile/SET_USER_PROFILE"
export const SET_STATUS = "profile/SET_STATUS"
export const DELETE_POST = "profile/DELETE_POST"
export const SET_PHOTO_SUCCESS = "profile/SET_PHOTO_SUCCESS"
export const SET_ERROR_CONTACTS = "profile/SET_ERROR_CONTACTS"

export type AddPostACType = ReturnType<typeof addPostActionCreater>;
export type SetUserProfileACType = ReturnType<typeof setUserProfile>;
export type SetStatusACType = ReturnType<typeof setStatusAC>
export type SetPhotoACType = ReturnType<typeof setPhotoSuccessAC>
export type setErrorContactsACType = ReturnType<typeof setErrorContactsAC>

export type ActionTypeForProfileReducer =
    AddPostACType |
    SetUserProfileACType |
    SetStatusACType |
    ReturnType<typeof deletePostACForTest> |
    SetPhotoACType |
    setErrorContactsACType

export type ProfilePageType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
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
    isErrorContacts: boolean

}

let initialState = {
    posts: [
        {id: v1(), message: "Hi", likeCount: 10},
        {id: v1(), message: "How are you", likeCount: 2},
        {id: v1(), message: "yooo", likeCount: 4},
    ],
    profile: null,
    status: "Hello",
    isErrorContacts: false
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
        case DELETE_POST: {
            let newState = {
                ...state, posts: state.posts
                    .filter(item => item.id != action.payload.id)
            }
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
        case SET_ERROR_CONTACTS: {
            return {
                ...state,
                isErrorContacts: action.payload.error
            }
        }
        case SET_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {
                    ...state.profile, photos: {...state.profile!.photos, small: action.payload.photo!}
                } as ProfilePageType
            }
        }
        default:
            return state;
    }
}
export const addPostActionCreater = (newPostText: string) =>
    ({
            type: ADD_POST, newPostText
        } as const
    );

export const setUserProfile = (profile: ProfilePageType) =>
    ({
        type: SET_USER_PROFILE,
        profile: profile,
    } as const);

export const setStatusAC = (status: string) =>
    ({
            type: SET_STATUS,
            status
        } as const
    )

export const deletePostACForTest = (id: string) =>
    ({
            type: DELETE_POST,
            payload: {id}
        } as const
    )

export const setPhotoSuccessAC = (photo: string) =>
    ({
            type: SET_PHOTO_SUCCESS,
            payload: {
                photo
            }
        } as const
    )
export const setErrorContactsAC = (error: boolean) =>
    ({
            type: SET_ERROR_CONTACTS,
            payload: {
                error
            }
        } as const
    )

export const getProfileThunkCreator = (userId: string): AppThunk => {
    return async (dispatch: Dispatch<ActionTypeForProfileReducer>) => {
        let res = await userApi.getProfile(userId)
        dispatch(setUserProfile(res.data))

    }
}

export const getStatusThunkCreator = (userId: string): AppThunk => {
    return async (dispatch: Dispatch<ActionTypeForProfileReducer>) => {
        let res = await profileApi.getStatus(userId)
        dispatch(setStatusAC(res.data))
    }
}

export const updateStatusThunkCreator = (status: string): AppThunk => {
    return async (dispatch: Dispatch<ActionTypeForProfileReducer>) => {
        let res = await profileApi.updateStatus(status)
        if (res.data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    }
}
export const savePhotoThunkCreator = (file: string): AppThunk => {
    return async (dispatch: Dispatch<ActionTypeForProfileReducer>) => {
        let res = await profileApi.savePhoto(file)
        if (res.data.resultCode === 0) {
            dispatch(setPhotoSuccessAC(res.data.data.photos.small))
        }
    }
}
export const saveProfileThunkCreator = (formdata: FormDataType): AppThunk => {

    return async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        let userId = getState().auth.userId
        let res = await profileApi.saveProfile(formdata)
        if (res.data.resultCode === 0) {
            userId && dispatch(getProfileThunkCreator(userId.toString()))
            dispatch(setErrorContactsAC(false))
        } else {
            dispatch(setErrorContactsAC(true))
            const errMessage = res.data.messages.length > 0 ?
                res.data.messages[0] :
                "Your contacts is not correct"
            let action = stopSubmit("edit-profile", {_error: errMessage})
            dispatch(action)
        }
    }
}


export default ProfileReducer;

import {
    myPostType,
} from "../../Profile/MyPost/MyPost";

export const ADD_POST = "ADD-POST";
export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
export const SET_USER_PROFILE = "SET_USER_PROFILE"

export type AddPostActionType = ReturnType<typeof addPostActionCreater>;
export type setUserProfileType = ReturnType<typeof setUserProfile>;
export type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextActionCreater>;
type actionType = AddPostActionType | setUserProfileType | UpdateNewPostTextActionType


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
    newPostText: string
    profile:  ProfilePageType
}

let initialState = {
    posts: [
        {id: 1, message: "Hi", likeCount: 10},
        {id: 2, message: "How are you", likeCount: 2},
        {id: 3, message: "yooo", likeCount: 4},
    ],
    newPostText: "Hello everybody)!",
    profile:null
    //     {
    //     userId: 'string',
    //     lookingForAJob: true,
    //     lookingForAJobDescription: "string",
    //     fullName: "string",
    //     contacts: {
    //         github: "string",
    //         vk: "string",
    //         facebook: "string",
    //         instagram: "string",
    //         twitter: "string",
    //         website: "string",
    //         youtube: "string",
    //         mainLink: "string",
    //     },
    //     photos: {
    //         small: "string",
    //         large: "string",
    //     }
    // }
}

const ProfileReducer = (
    state: InitialStateTypeForProfile = initialState,
    action: actionType
): InitialStateTypeForProfile => {
    switch (action.type) {
        case ADD_POST: {
            if (!state.newPostText) {
                return state;
            } else {
                const newPost: myPostType = {
                    id: 5,
                    message: state.newPostText,
                    likeCount: 5,
                };
                let newState = {...state, posts: [newPost, ...state.posts], newPostText: " "}
                // state.posts.push(newPost);
                // state.newPostText = "";
                return newState;
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.newText};
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        default:
            return state;
    }
};

export const addPostActionCreater = () => ({type: ADD_POST} as const);
export const updateNewPostTextActionCreater = (text: string) =>
    ({
        type: UPDATE_NEW_POST_TEXT,
        newText: text,
    } as const);

export const setUserProfile = (profile: ProfilePageType) =>
    ({
        type: SET_USER_PROFILE,
        profile: profile,
    } as const);

export default ProfileReducer;

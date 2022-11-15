import {userApi} from "../../api/Api";
import {Dispatch} from "redux";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = "TOGGLE_IS_FOLLOWING_IN_PROGRESS"

export type UsersType = {
    id: number;
    photos: {
        small: string | null;
        large: string | null;
    };
    followed: boolean;
    name: string;
    status: string;
    uniqueUrlName: null | string
};
export type InitialStateType = {
    users: UsersType[];
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: number[]
};

type FollowACType = ReturnType<typeof followAC>;
type UnFollowACType = ReturnType<typeof unfollowAC>;
type SetUsersAcType = ReturnType<typeof setUsersAC>;
type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>;
type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>;
type SetIsFetchingACType = ReturnType<typeof toggleIsFetchingAC>
type toggleIsFollowingACType = ReturnType<typeof toggleIsFollowingAC>

type ActionType =
    | FollowACType
    | UnFollowACType
    | SetUsersAcType
    | SetCurrentPageACType
    | SetTotalUsersCountACType
    | SetIsFetchingACType
    | toggleIsFollowingACType

const initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const UsersRedusers = (
    state: InitialStateType = initialState,
    action: ActionType
): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: [...state["users"]].map((item) =>
                    item.id === action.payload.userId
                        ? {...item, followed: true}
                        : item
                ),
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: [...state["users"]].map((item) =>
                    item.id === action.payload.userId
                        ? {...item, followed: false}
                        : item
                ),
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.payload.users,
            };
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload.currentPage,
            };
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.payload.totalUsersCount,
            };
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state, isFetching: action.payload.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress:
                    action.payload.isFollowing
                        ? [...state.followingInProgress, action.payload.userId]
                        : state.followingInProgress.filter(id => id !== action.payload.userId)
            }
        }
        default:
            return state;
    }
};

export const followAC = (id: number) =>
    ({
        type: FOLLOW,
        payload: {
            userId: id,
        },
    } as const);

export const unfollowAC = (id: number) =>
    ({
        type: UNFOLLOW,
        payload: {
            userId: id,
        },
    } as const);

export const setUsersAC = (users: UsersType[]) =>
    ({
        type: SET_USERS,
        payload: {
            users: users,
        },
    } as const);

export const setCurrentPageAC = (currentPage: number) =>
    ({
        type: SET_CURRENT_PAGE,
        payload: {
            currentPage: currentPage,
        },
    } as const);

export const setTotalUsersCountAC = (totalUsersCount: number) =>
    ({
        type: SET_TOTAL_USERS_COUNT,
        payload: {
            totalUsersCount: totalUsersCount,
        },
    } as const);

export const toggleIsFetchingAC = (isFetching: boolean) =>
    ({
        type: TOGGLE_IS_FETCHING,
        payload: {
            isFetching: isFetching,
        },
    } as const);

export const toggleIsFollowingAC = (isFollowing: boolean, userId: number) =>
    ({
        type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
        payload: {
            isFollowing: isFollowing,
            userId: userId
        },
    } as const);



export const getUsersThunkCreator = (currentPage:number,pageSize:number ) => {
    return (dispatch: Dispatch) => {

        dispatch(toggleIsFetchingAC(true))

        userApi.getUsers(currentPage, pageSize)
            /*вынесли запрос в файл api.js в функцию getUsers*/
            .then(data => {
                dispatch(toggleIsFetchingAC(false))
                dispatch(setUsersAC(data.items))
                dispatch(setTotalUsersCountAC(Math.ceil(data.totalCount / 350)))
            })
    }
}

export const followSuccessThunkCreator = (userId:number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingAC(true, userId))

        //логика запроса перенесена в userApi
        userApi.follow(userId)
            .then((res) => {
                if (res.data.resultCode == 0) {
                    dispatch(followAC(userId))
                }
                dispatch(toggleIsFollowingAC(false, userId))
            })

    }
}

export const unFollowSuccessThunkCreator = (userId:number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingAC(true, userId))

        //логика запроса перенесена в userApi
        userApi.unFollow(userId)
            .then((res) => {
                if (res.data.resultCode == 0) {
                    dispatch(unfollowAC(userId))
                }
                dispatch(toggleIsFollowingAC(false, userId))
            })

    }
}

export default UsersRedusers;

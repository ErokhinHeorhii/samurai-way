import {userApi} from "../../api/Api";
import {Dispatch} from "redux";
import {AppDispatch, AppThunk} from "./RedaxStore";
import {updateObjectInArray} from "../../utils/object-helpers";

const FOLLOW = "user/FOLLOW";
const UNFOLLOW = "user/UNFOLLOW";
const SET_USERS = "user/SET_USERS";
const SET_CURRENT_PAGE = "user/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "user/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "user/TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = "user/TOGGLE_IS_FOLLOWING_IN_PROGRESS"

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
    totalItemsCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: number[],
    portionSize:number
};

export type FollowACType = ReturnType<typeof followAC>;
type UnFollowACType = ReturnType<typeof unfollowAC>;
type SetUsersAcType = ReturnType<typeof setUsersAC>;
type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>;
type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>;
type SetIsFetchingACType = ReturnType<typeof toggleIsFetchingAC>
type toggleIsFollowingACType = ReturnType<typeof toggleIsFollowingAC>

export type ActionTypeForUserReduser =
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
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    portionSize : 9
};


const UsersRedusers = (
    state: InitialStateType = initialState,
    action: ActionTypeForUserReduser
): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state["users"],
                    action.payload.userId, 'id',
                    {followed: true})
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state["users"],
                    action.payload.userId, 'id',
                    {followed: false})
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
                totalItemsCount: action.payload.totalItemsCount,
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

export const setTotalUsersCountAC = (totalItemsCount: number) =>
    ({
        type: SET_TOTAL_USERS_COUNT,
        payload: {
            totalItemsCount: totalItemsCount,
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

export const getUsersThunkCreator = (currentPage: number, pageSize: number): AppThunk => {
    return async (dispatch) => {

        dispatch(toggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(currentPage))
        let data = await userApi.getUsers(currentPage, pageSize)
        /*вынесли запрос в файл api.js в функцию getUsers*/
        dispatch(toggleIsFetchingAC(false))
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersCountAC(Math.ceil(data.totalCount )))
    }
}

const followUnfollowFlow = async (dispatch: Dispatch, userId: number,
                                  apiMethod: (itemId: number) => any,
                                  actionCreator: ((id: number) => ActionTypeForUserReduser
                                      )) => {
    dispatch(toggleIsFollowingAC(true, userId))
    //логика запроса перенесена в userApi
    let res = await apiMethod(userId)
    if (res.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingAC(false, userId))
}

export const followSuccessThunkCreator = (userId: number): AppThunk => {

    return async (dispatch: AppDispatch) => {
        let apiMethod = userApi.follow.bind(userApi)
        let actionCreator = followAC
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }

}

export const unFollowSuccessThunkCreator = (userId: number): AppThunk => {

    return async (dispatch: AppDispatch) => {
        let apiMethod = userApi.unFollow.bind(userApi)
        let actionCreator = unfollowAC
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

export default UsersRedusers;

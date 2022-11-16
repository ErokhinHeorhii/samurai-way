import {Dispatch} from "redux";
import {userApi} from "../../api/Api";
import {setUserProfile} from "./ProfileReduser";
import {AppThunk} from "./RedaxStore";

const SET_USERS_DATA = "SET_USERS_DATA";

export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
};

const initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}
export type SetUserDataACType = ReturnType<typeof setAuthUserData>

 export type ActionTypeForAuthReduser = SetUserDataACType

const HeaderAuthReduser = (
    state: InitialStateType = initialState,
    action: ActionTypeForAuthReduser
): InitialStateType => {
    switch (action.type) {
        case SET_USERS_DATA: {
            return {
                ...state,
                ...action.payload,
                isAuth: true
            };
        }
        default:
            return state;
    }
};

export const setAuthUserData = (userId: number, email: string, login: string) =>
    ({
        type: SET_USERS_DATA,
        payload: {
            userId: userId,
            email: email,
            login: login
        },
    } as const);

export const getAuthThunkCreator = ():AppThunk => {
    return (dispatch: Dispatch<ActionTypeForAuthReduser>) => {

        userApi.getAuth()
            .then(res => {
                if (res.data.resultCode === 0) {
                    const {id, login, email} = res.data.data
                    dispatch(setAuthUserData(id, email, login))

                }
            })
    }
}



export default HeaderAuthReduser;

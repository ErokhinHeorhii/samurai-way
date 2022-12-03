import {Dispatch} from "redux";
import {authApi, userApi} from "../../api/Api";
import {setUserProfile} from "./ProfileReduser";
import {AppDispatch, AppThunk} from "./RedaxStore";

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
export type SetUserDataACType = ReturnType<typeof setAuthUserDataAC>

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
            };
        }
        default:
            return state;
    }
};

export const setAuthUserDataAC = (userId: number|null, email: string|null, login: string|null, isAuth: boolean) =>
    ({
        type: SET_USERS_DATA,
        payload: {
            userId: userId,
            email: email,
            login: login,
            isAuth:isAuth
        },
    } as const);

export const getAuthThunkCreator = ():AppThunk => {
    return (dispatch: Dispatch<ActionTypeForAuthReduser>) => {

        userApi.getAuth()
            .then(res => {
                if (res.data.resultCode === 0) {
                    const {id, login, email} = res.data.data
                    dispatch(setAuthUserDataAC(id, email, login, true))

                }
            })
    }
}

export const loginThunkCreator = (email:string, password:string, rememberMe:boolean):AppThunk => {
    return (dispatch:AppDispatch) => {
        authApi.login(email, password, rememberMe )
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(getAuthThunkCreator())
                }
            })
    }
}

export const loginOutThunkCreator = ():AppThunk => {
    return (dispatch: Dispatch<ActionTypeForAuthReduser>) => {
        authApi.logOut()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAuthUserDataAC(null, null, null, false))
                }
            })
    }
}



export default HeaderAuthReduser;


//connect создает calBack rjnjhsq получает указанные параметры и dispatch  loginThunkCreator с данными параметрами

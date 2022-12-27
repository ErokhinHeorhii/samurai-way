import {Dispatch} from "redux";
import {authApi, userApi} from "../../api/Api";
import {AppThunk} from "./RedaxStore";
import {stopSubmit} from "redux-form";

const SET_USERS_DATA = "headerAuth/SET_USERS_DATA";

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
};

export type FormStopSubmitType = ReturnType<typeof stopSubmit>

const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}
export type SetUserDataACType = ReturnType<typeof setAuthUserDataAC>

export type ActionTypeForAuthReducer = SetUserDataACType

const HeaderAuthReducer = (
    state: InitialStateType = initialState,
    action: ActionTypeForAuthReducer
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

export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({
        type: SET_USERS_DATA,
        payload: {
            userId: userId,
            email: email,
            login: login,
            isAuth: isAuth
        },
    } as const);

export const getAuthThunkCreator = (): AppThunk => async (dispatch: Dispatch<ActionTypeForAuthReducer>) => {
    let res = await userApi.getAuth()
    if (res.data.resultCode === 0) {
        const {id, login, email} = res.data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean): AppThunk => {
    return async (dispatch) => {
        let res = await authApi.login(email, password, rememberMe)
        if (res.data.resultCode === 0) {
            dispatch(getAuthThunkCreator())
        } else {
            const errMessage = res.data.messages.length > 0 ? res.data.messages[0] : "Your data is not correct"
            let action = stopSubmit("login", {_error: errMessage})
            dispatch(action)
        }
    }
}

export const loginOutThunkCreator = (): AppThunk => {
    return async (dispatch: Dispatch<ActionTypeForAuthReducer>) => {
        let res =  await authApi.logOut()
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(null, null, null, false))
        }
    }
}

export default HeaderAuthReducer;

//connect создает calBack rjnjhsq получает указанные параметры и dispatch  loginThunkCreator с данными параметрами

import {Dispatch} from "redux";
import {authApi, securityApi, userApi} from "../../api/Api";
import {AppThunk} from "./RedaxStore";
import {stopSubmit} from "redux-form";

const SET_USERS_DATA = "headerAuth/SET_USERS_DATA";
const GET_CAPTCHA_URL = "headerAuth/GET_CAPTCHA_URL";

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean,
    captcha: string | null,
};

export type FormStopSubmitType = ReturnType<typeof stopSubmit>
export type GetCaptchaUrlACType = ReturnType<typeof getCaptchaUrlAC>

const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null,
}
export type SetUserDataACType = ReturnType<typeof setAuthUserDataAC>


export type ActionTypeForAuthReducer =
    SetUserDataACType |
    FormStopSubmitType |
    GetCaptchaUrlACType

const HeaderAuthReducer = (
    state: InitialStateType = initialState,
    action: ActionTypeForAuthReducer
): InitialStateType => {
    switch (action.type) {
        case SET_USERS_DATA:
        case GET_CAPTCHA_URL: {
            return {
                ...state,
                ...action.payload,
            }
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

export const getCaptchaUrlAC = (captcha: string) =>
    ({
        type: GET_CAPTCHA_URL,
        payload: {
            captcha
        },
    } as const);


export const getAuthThunkCreator = (): AppThunk => async (dispatch: Dispatch<ActionTypeForAuthReducer>) => {
    let res = await userApi.getAuth()
    if (res.data.resultCode === 0) {
        const {id, login, email} = res.data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha:string): AppThunk => {
    return async (dispatch) => {
        let res = await authApi.login(email, password, rememberMe, captcha)
        if (res.data.resultCode === 0) {
            dispatch(getAuthThunkCreator())
            dispatch(getCaptchaUrlAC(''))
        } else {
            if (res.data.resultCode === 10) {
            debugger
                dispatch(getCaptchaThunkCreator())
            }
            const errMessage = res.data.messages.length > 0 ? res.data.messages[0] : "Your data is not correct"
            let action = stopSubmit("login", {_error: errMessage})
            dispatch(action)
        }
    }
}

export const loginOutThunkCreator = (): AppThunk => {
    return async (dispatch: Dispatch<ActionTypeForAuthReducer>) => {
        let res = await authApi.logOut()
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(null, null, null, false))
        }
    }
}

export const getCaptchaThunkCreator = (): AppThunk => {
    return async (dispatch) => {
        let res = await securityApi.getCaptchaUrl()
            const captchaUrl = res.data.url
            dispatch(getCaptchaUrlAC(captchaUrl))
        debugger
    }
}

export default HeaderAuthReducer;

//connect создает calBack  получает указанные параметры и dispatch  loginThunkCreator с данными параметрами

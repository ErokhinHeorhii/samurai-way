import {AnyAction, Dispatch} from "redux";
import {authApi, userApi} from "../../api/Api";
import {setUserProfile} from "./ProfileReduser";
import {AppDispatch, AppThunk} from "./RedaxStore";
import {stopSubmit} from "redux-form";
import {ActionTypeForAuthReduser, getAuthThunkCreator} from "./HeaderAuthReduser";

const SET_INITIALIZED = "SET_INITIALIZED";

export type InitialStateType = {
    initialized: boolean
};


const initialState: InitialStateType = {
    initialized: false
}

type setInitializedSuccessACType = ReturnType<typeof setInitializedSuccessAC>
export type ActionTypeForAppReduser = setInitializedSuccessACType

  export const AppReducer = (
    state: InitialStateType = initialState,
    action: ActionTypeForAppReduser
): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true,
            };
        }
        default:
            return state;
    }
};

export const setInitializedSuccessAC = () =>
    ({
        type: SET_INITIALIZED,
    } as const);

export const initialiseAppTC = (): AppThunk => {
    return (dispatch) => {

      let promiseDispatchResult= dispatch(getAuthThunkCreator())
        Promise.all([promiseDispatchResult])
            .then(()=>{
           dispatch(setInitializedSuccessAC())
        })


    }
}


export default AppReducer;


//connect создает calBack rjnjhsq получает указанные параметры и dispatch  loginThunkCreator с данными параметрами

import {AppThunk} from "./RedaxStore";
import {getAuthThunkCreator} from "./HeaderAuthReducer";

const SET_INITIALIZED = "SET_INITIALIZED";
const SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR'

export type InitialStateType = {
    initialized: boolean,
    globalError: string |null

};

const initialState: InitialStateType = {
    initialized: false,
    globalError: null
}
type setGlobalErrorACType = ReturnType<typeof setGlobalErrorAC>
type setInitializedSuccessACType = ReturnType<typeof setInitializedSuccessAC>
export type ActionTypeForAppReduser = setInitializedSuccessACType |setGlobalErrorACType

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
        case SET_GLOBAL_ERROR: {
            return {
                ...state,
                globalError: action.payload.globalError,
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

export const setGlobalErrorAC = (globalError:string | null) =>
    ({
        type: SET_GLOBAL_ERROR,
         payload:{
             globalError
         }
    } as const);

export const initialiseAppTC = (): AppThunk => {
    return (dispatch) => {

        let promiseDispatchResult = dispatch(getAuthThunkCreator())
        Promise.all([promiseDispatchResult])
            .then(() => {
                dispatch(setInitializedSuccessAC())
            })
    }
}

export const viewGlobalErrorTC = (globalError:string): AppThunk => {
    return (dispatch) => {
        dispatch(setGlobalErrorAC(globalError))
        new Promise((res:(value?: unknown) => void) =>{
            setTimeout(()=>{
                dispatch(setGlobalErrorAC(null))
               res()
            },5000)
        })
    }
}


export default AppReducer;

//connect создает calBack rjnjhsq получает указанные параметры и dispatch  loginThunkCreator с данными параметрами

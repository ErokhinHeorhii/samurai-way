import {Dispatch} from "redux";
import {connect} from "react-redux";
import {
    addMessageActionCreater,
    InitialStateType, updateNewMessageTextActionCreater,
} from "../Redux/DialogReduser";
import {AllAppStateType} from "../Redux/RedaxStore";
import Dialogs from "./Dialogs";


type MapStateToPropsType = {
    dialogsPage: InitialStateType
    isAuth: boolean
}

type MapDispatchToPropsType = {
    updateNewMessageText: (text: string) => void
    addMessage: () => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {


    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth

    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageText: (text: string) => {
            dispatch(updateNewMessageTextActionCreater(text))
        },
        addMessage: () => {
            dispatch(addMessageActionCreater())
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
export default DialogsContainer
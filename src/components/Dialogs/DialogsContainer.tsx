import {compose, Dispatch} from "redux";
import {connect} from "react-redux";
import {
    addMessageActionCreater,
    InitialStateType,
} from "../Redux/DialogReducer";
import {AllAppStateType} from "../Redux/RedaxStore";
import Dialogs from "./Dialogs";
import React from "react";
import {withAuthRedirect} from "../../HOC/WithAuthRedirectComponent";


type MapStateToPropsType = {
    dialogsPage: InitialStateType
}

type MapDispatchToPropsType = {
    addMessage: (values:string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {

    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addMessage: (newMessageBody:string) => {
            dispatch(addMessageActionCreater(newMessageBody))
        }
    }
}

/* Логика проверки на Login вынесена в HOC */
// let AuthRedirectComponent = withAuthRedirect(Dialogs)

// export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
// export default DialogsContainer

//добавили финкцию compose  и зарефакторили с ее помощью
export default   compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
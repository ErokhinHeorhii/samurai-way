import {compose, Dispatch} from "redux";
import {connect} from "react-redux";
import {
    addMessageActionCreater,
    InitialStateType, updateNewMessageTextActionCreater,
} from "../Redux/DialogReduser";
import {AllAppStateType} from "../Redux/RedaxStore";
import Dialogs from "./Dialogs";
import {Redirect} from "react-router-dom";
import React from "react";
import {ProfilePropsType} from "../../Profile/ProfileContainer";
import {withAuthRedirect} from "../../HOC/WithAuthRedirectComponent";


type MapStateToPropsType = {
    dialogsPage: InitialStateType
    // isAuth: boolean
}

type MapDispatchToPropsType = {
    updateNewMessageText: (text: string) => void
    addMessage: () => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {

    return {
        dialogsPage: state.dialogsPage,
        // isAuth: state.auth.isAuth

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
//
// let AuthRedirectComponent =(props:DialogsPropsType)=>{
//     if(!props.isAuth ) {
//         return <Redirect to ={"./login"}/>
//     }
//     return (
//         <Dialogs {...props}/>
//     )
// }


/* Логика проверки на Login вынесена в HOC */
// let AuthRedirectComponent = withAuthRedirect(Dialogs)

// export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
// export default DialogsContainer

//добавили финкцию compose  и зарефакторили с ее помощью
export default   compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
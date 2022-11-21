import React, {ComponentType} from "react"
import {Redirect} from "react-router-dom";
import Dialogs from "../components/Dialogs/Dialogs";
import {connect} from "react-redux";
import {AllAppStateType} from "../components/Redux/RedaxStore";

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state:AllAppStateType): MapStateToPropsType=>{
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect <T>(Component:ComponentType<T>) {
    class RedirectComponent extends React.Component<MapStateToPropsType> {

        render() {
            let {isAuth, ...restProps} =this.props
            if(!this.props.isAuth ) return <Redirect to ={"./login"}/>

            console.log("isAuth",this.props.isAuth)
            return  <Component {...restProps as T}/>

        }
    }
    let connectedRedirectComponent = connect (mapStateToProps)(RedirectComponent)

    return connectedRedirectComponent
}

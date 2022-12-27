import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import { loginOutThunkCreator} from "../Redux/HeaderAuthReducer";
import {AllAppStateType} from "../Redux/RedaxStore";

type setAuthUserDataType = {
    id: number | null
    email: string | null
    login: string | null,
}

type MapStateToPropsType = {
    userId?: number | null
    email?: string | null
    login: string | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    // setAuthUserData: (userAprId: number, email: string, login: string) => void
    loginOutThunkCreator:()=>void
}
 export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType> {

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        userId: state.auth.userId,
        email: state.auth.email
    }
}

export default connect(mapStateToProps, {loginOutThunkCreator})(HeaderContainer)
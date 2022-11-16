import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {getAuthThunkCreator, setAuthUserData} from "../Redux/HeaderAuthReduser";
import {AllAppStateType} from "../Redux/RedaxStore";
import {userApi} from "../../api/Api";
import {Dispatch} from "redux";

type setAuthUserDataType = {
    id: number | null
    email: string | null
    login: string | null,
}

type MapStateToPropsType = {
    id?: number | null
    email?: string | null
    login: string | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    setAuthUserData: (userId: number, email: string, login: string) => void
    getAuthThunkCreator:any
}
 export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType> {

    componentDidMount() {
        // userApi.getAuth()
        //     .then(res => {
        //         if (res.data.resultCode === 0) {
        //             console.log(res.data.data)
        //             const {id, login, email} = res.data.data
        //         this.props.setAuthUserData(id, email, login)
        //
        //         }
        //     })

        this.props.getAuthThunkCreator()

    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        id: state.auth.id,
        email: state.auth.email
    }
}

export default connect(mapStateToProps, {setAuthUserData,getAuthThunkCreator})(HeaderContainer)
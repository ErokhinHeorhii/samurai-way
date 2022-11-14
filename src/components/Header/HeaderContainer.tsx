import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {NavLink, RouteComponentProps, withRouter} from "react-router-dom";
import avatarProfile from "../../src/assets/images/AvatarForProfile.jpg"
import style from "./Header.module.css";
import Header from "./Header";
import {UsersType} from "../Redux/UsersReduser";
import {setAuthUserData, SetUserDataACType} from "../Redux/HeaderAuthReduser";
import {AllAppStateType} from "../Redux/RedaxStore";

type setAuthUserDataType = {
    id: number | null
    email: string | null
    login: string | null,
}

type MapStateToPropsType = {
    id: number | null
    email?: string | null
    login: string | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    setAuthUserData: (userId: number, email: string, login: string) => void
}
 export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,
            {withCredentials: true})
            .then(res => {
                if (res.data.resultCode === 0) {
                    console.log(res.data.data)
                    const {id, login, email} = res.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
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

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)
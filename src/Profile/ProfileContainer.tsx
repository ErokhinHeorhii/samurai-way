import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfilePageType, setUserProfile} from "../components/Redux/ProfileReduser";
import {AllAppStateType} from "../components/Redux/RedaxStore";

type MapStateToPropsType = {
    profile:ProfilePageType
}
type MapDispatchToPropsType = {
    setUserProfile:(profile:ProfilePageType)=>void
}

export type ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(res => {
                this.props.setUserProfile(res.data)
            })
    }

    render() {
        return (<div>
            <Profile  profile={this.props.profile} />

        </div>)
    }
}

let mapStateToProps = (state: AllAppStateType):MapStateToPropsType => ({
profile : state.profilePage.profile})


export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);

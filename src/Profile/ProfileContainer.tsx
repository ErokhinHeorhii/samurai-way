import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunkCreator, ProfilePageType, setUserProfile} from "../components/Redux/ProfileReduser";
import {AllAppStateType} from "../components/Redux/RedaxStore";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {userApi} from "../api/Api";

type WithRouterType = {
    userId: string
}

type MapStateToPropsType = {
    profile: ProfilePageType
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfilePageType) => void
    getProfileThunkCreator:any
}

export type ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<WithRouterType>

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        //получаем userId из props которые прокинули с помощью withRouter (match/params/ userId: XXX)
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "2"
        }

        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
// userApi.getProfile(userId)
//             .then(res => {
//                 this.props.setUserProfile(res.data)
//             })


//        перенесли логику в Thunk
        this.props.getProfileThunkCreator(userId)
    }

    render() {
        return (<div>
            <Profile profile={this.props.profile}/>
        </div>)
    }
}

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile, getProfileThunkCreator})(WithUrlDataContainerComponent);

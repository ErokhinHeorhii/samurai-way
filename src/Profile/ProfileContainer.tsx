import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunkCreator,
    getStatusThunkCreator,
    ProfilePageType, updateStatusThunkCreator,
} from "../components/Redux/ProfileReduser";
import {AllAppStateType} from "../components/Redux/RedaxStore";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../HOC/WithAuthRedirectComponent";
import {compose} from "redux";

type WithRouterType = {
    userId: string
}

type MapStateToPropsType = {
    profile: ProfilePageType
    status:string
}
type MapDispatchToPropsType = {
    getProfileThunkCreator: (userId: string) => void
    getStatusThunkCreator:(userId: string)=> void
    updateStatusThunkCreator:(status: string)=>void
}

export type ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<WithRouterType>


class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        //получаем userId из props которые прокинули с помощью withRouter (match/params/ userId: XXX)
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "26184"
        }

        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
// userApi.getProfile(userId)
//             .then(res => {
//                 this.props.setUserProfile(res.data)
//             })

//        перенесли логику в Thunk
        this.props.getProfileThunkCreator(userId)
        this.props.getStatusThunkCreator(userId)
    }

    render() {
        // if(!this.props.isAuth ) {
        //     return <Redirect to ={"./login"}/>
        // }
        return (<div>
            <Profile profile={this.props.profile}
                     status ={this.props.status}
                     updateStatusThunkCreator ={this.props.updateStatusThunkCreator}/>
        </div>)
    }
}

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    // isAuth: state.auth.isAuth
    status:state.profilePage.status
})

// let WithUrlDataContainerComponent = withRouter(ProfileContainer)

/* Логика проверки на Login вынесена в HOC */
// let AuthRedirectComponent = withAuthRedirect(WithUrlDataContainerComponent)

// export default connect(mapStateToProps, { getProfileThunkCreator})(AuthRedirectComponent);

//добавили финкцию compose  и зарефакторили с ее помощью
export default compose <React.ComponentType>(
    connect(mapStateToProps, {getProfileThunkCreator,getStatusThunkCreator,updateStatusThunkCreator}),
        withRouter,
        withAuthRedirect
)(ProfileContainer)
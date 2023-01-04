import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunkCreator,
    getStatusThunkCreator,
    ProfilePageType, savePhotoThunkCreator, updateStatusThunkCreator,
} from "../components/Redux/ProfileReducer";
import {AllAppStateType} from "../components/Redux/RedaxStore";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../HOC/WithAuthRedirectComponent";
import {compose} from "redux";

type WithRouterType = {
    userId: string
}

type MapStateToPropsType = {
    profile: ProfilePageType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getProfileThunkCreator: (userId: string) => void
    getStatusThunkCreator: (userId: string) => void
    updateStatusThunkCreator: (status: string) => void
    savePhotoThunkCreator:(file:string)=>void
}

export type ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<WithRouterType>

class ProfileContainer extends React.Component<ProfilePropsType> {

    refreshProfile() {
        //получаем userId из props которые прокинули с помощью withRouter (match/params/ userId: XXX)
        let userId = this.props.match.params.userId

        if (!userId) {
            //history.push заменяет путь в url напрямую без state
            userId = this.props.authorizedUserId ? this.props.authorizedUserId.toString() : this.props.history.push("/login")!
        }
        this.props.getProfileThunkCreator(userId)
        this.props.getStatusThunkCreator(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfilePropsType>,
                       prevState: Readonly<{}>,
                       snapshot?: any) {
        //сравниваем текущие пропсы с предыдущими чтобы не было зацикливания
        if (this.props.match.params.userId !== prevProps.match.params.userId) {

            this.refreshProfile()
        }
    }

    render() {
        return (<div>
            <Profile profile={this.props.profile}
                     status={this.props.status}
                     updateStatusThunkCreator={this.props.updateStatusThunkCreator}
                     isOwner={!this.props.match.params.userId}
                     savePhotoThunkCreator={this.props.savePhotoThunkCreator}
            />
        </div>)
    }
}

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    // isAuth: state.auth.isAuth
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

// let WithUrlDataContainerComponent = withRouter(ProfileContainer)

/* Логика проверки на Login вынесена в HOC */
// let AuthRedirectComponent = withAuthRedirect(WithUrlDataContainerComponent)

// export default connect(mapStateToProps, { getProfileThunkCreator})(AuthRedirectComponent);

//добавили финкцию compose  и зарефакторили с ее помощью
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator, savePhotoThunkCreator}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
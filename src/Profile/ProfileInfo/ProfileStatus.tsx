import s from './ProfileInfo.module.css'
import {ProfilePageType} from "../../components/Redux/ProfileReduser";
import avatarProfile from "../../assets/images/AvatarForProfile.jpg"
import style from './ProfileInfo.module.css'
import React, {useState} from "react";


type PropsType = {
    status: string
}

class ProfileStatus extends React.Component<PropsType> {

    state = {
        editMode: false
    }

    activateEditMode = () => {
/*setState работает асинхронно*/
       this.setState({
           editMode : true
       } )

        /*костыль*/
        // this.forceUpdate()
    }

    deactivateEditMode = () => {
        this.setState({
            editMode : false
        } )
    }

    render() {
        return (<div className={style.wrapperForStatus}>

            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                </div>}

            {this.state.editMode &&
                <div>
                    <input value={this.props.status} onBlur={this.deactivateEditMode.bind(this)} autoFocus={true}></input>
                </div>}

        </div>)
    }
}

export default ProfileStatus
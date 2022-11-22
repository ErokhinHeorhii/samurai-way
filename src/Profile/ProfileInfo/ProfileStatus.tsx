import style from './ProfileInfo.module.css'
import React, {ChangeEvent} from "react";

type stateType = {
    editMode: boolean
    status: string
}

type PropsType = {
    status: string
    updateStatusThunkCreator: (status: string) => void
}

class ProfileStatus extends React.Component<PropsType> {

    state = {
        editMode: false,
        status: this.props.status ? this.props.status : "Hello from me"
    }

    activateEditMode = () => {
        /*setState работает асинхронно*/
        this.setState({
            editMode: true
        })

        /*костыль*/
        // this.forceUpdate()
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })


    }

    onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.updateStatusThunkCreator(e.currentTarget.value)
        this.setState({
            status: e.currentTarget.value
        })

    }

    componentDidUpdate(prevProps: PropsType, prevState: stateType) {
        /*обязательно делать условие чтобы не было зацикливания*/
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
        let a = this.state
        let b = this.props
    }

    render() {


        return (<div className={style.wrapperForStatus}>

            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "Hello from me"}</span>
                </div>}

            {this.state.editMode &&
                <div>
                    <input value={this.state.status}
                           onBlur={this.deactivateEditMode}
                           autoFocus={true}
                           onChange={this.onChangeStatus}
                    ></input>
                </div>}

        </div>)
    }
}

export default ProfileStatus
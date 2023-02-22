import style from './ProfileInfo.module.css'
import React, {ChangeEvent, useEffect, useState} from "react";
import {ProfileStatusPropsType} from "./ProfileStatus";

const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)
    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        props.updateStatusThunkCreator(status)
        setEditMode(false)
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <div className={style.wrapperForStatus}>
            <b>Your status: </b>
            {!editMode &&
                <div>
                    <span className={style.status}  onDoubleClick={activateEditMode}>{props.status || "Hello from me"}</span>
                </div>}

            {editMode &&
                <div>
                    <input value={status}
                           onBlur={deactivateEditMode}
                           autoFocus={true}
                           onChange={onChangeStatus}
                    ></input>
                </div>
            }

        </div>)
}


export default ProfileStatusWithHooks

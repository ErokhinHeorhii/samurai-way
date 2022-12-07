import style from './ProfileInfo.module.css'
import React, {ChangeEvent, useEffect, useState} from "react";
import {ProfileStatusPropsType} from "./ProfileStatus";

type StateType = {
    editMode: boolean
    status: string
}

type PropsType = {
    status: string
    updateStatusThunkCreator: (status: string) => void
}

const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)
    const activateEditMode = () => {
        /*setState работает асинхронно*/
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.updateStatusThunkCreator(e.currentTarget.value)
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <div className={style.wrapperForStatus}>

            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{status || "Hello from me"}</span>
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
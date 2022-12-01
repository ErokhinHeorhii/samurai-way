import React, {ChangeEvent} from "react";
import SuperButton from "../../SuperButton/SuperButton";
import s from "./Dialogs.module.css"
import {DialogsPropsType} from "./DialogsContainer";
import DialogItem from "./DialogsItem/DialogItem";
import Message
    from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type myDialogsDataType = {
    id: number
    name: string
    src: string
}
type FormDataType = {
    newMessageBody: string
}

const Dialogs = (props: DialogsPropsType) => {
    const {dialogs, messages, answerMessages} = props.dialogsPage
    const {addMessage} = props
    let dialogsElements = dialogs.map(item => {
        return <DialogItem key={item.id} name={item.name} id={item.id} src={item.src}/>
    })

    let messagesElements = messages.map(item => {
        return (<Message key={item.id} message={item.message} id={item.id}/>
        )
    })

    let answerMessagesElements = answerMessages.map(item => {
        return <Message key={item.id} message={item.message} id={item.id}/>
    })

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget ? e.currentTarget.value : " "
    }
    // if(!props.isAuth ) {
    //     return <Redirect to ={"./login"}/>
    // }
    const addNewMessage = (values: FormDataType) => {
        addMessage(values.newMessageBody)
    }

    return (<>
            <div className={s.dialogs}>
                <div className={s.dialogsItem}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <AddMessageFormRedax onSubmit={addNewMessage}/>
                    {messagesElements}
                </div>
                <div className={s.messages}>
                    {answerMessagesElements}
                </div>
            </div>
        </>
    )
}

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className={s.textarea} component="textarea" name="newMessageBody"
                       placeholder="Enter your message"/>
                {/*<textarea*/}
                {/*    value={props.newDialogsMessage}*/}
                {/*    onChange={props.onChangeHandler}>*/}
                {/*</textarea>*/}
            </div>
            <SuperButton >Add</SuperButton>
        </form>
    )
}

const AddMessageFormRedax = reduxForm<FormDataType>({
    form: "dialogAddMessageForm"
})(AddMessageForm)


export default Dialogs


import React from "react";
import SuperButton from "../../SuperButton/SuperButton";
import s from "./Dialogs.module.css"
import {DialogsPropsType} from "./DialogsContainer";
import DialogItem from "./DialogsItem/DialogItem";
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {Textarea} from "../common/formControls/FormControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import Message from "../../Profile/MyPost/Post/Message";
import avatar from '../../assets/images/avatarDialogs.jpg'
import  avatarAnswer from '../../assets/images/avatarDialogsAnswer.jpg'
import {useDispatch} from "react-redux";
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
    const dispatch = useDispatch()
    let dialogsElements = dialogs.map(item => {
        return <DialogItem key={item.id} name={item.name} id={item.id} src={item.src}/>
    })

    let messagesElements = messages.map(item => {
        return (<Message key={item.id} message={item.message} id={item.id} avatar={avatar}/>
        )
    })

    let answerMessagesElements = answerMessages.map(item => {
        return <Message key={item.id} message={item.message} id={item.id} avatar={avatarAnswer}/>
    })

    const addNewMessage = (values: FormDataType) => {
        addMessage(values.newMessageBody)
        dispatch(reset('dialogAddMessageForm'))
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
                <div className={s.messages + ' ' + s.answerMessages }>
                    {answerMessagesElements}
                </div>
            </div>
        </>
    )
}

const maxLength15=maxLengthCreator(15)

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className={s.textarea} component={Textarea}
                       validate={[requiredField,maxLength15]} name="newMessageBody"
                       placeholder="Enter your message"/>
            </div>
            <SuperButton >Add</SuperButton>
        </form>
    )
}

const AddMessageFormRedax = reduxForm<FormDataType>({
    form: "dialogAddMessageForm"
})(AddMessageForm)


export default Dialogs


import React, {ChangeEvent} from "react";
import SuperButton from "../../SuperButton/SuperButton";
import s from "./Dialogs.module.css"
import {DialogsPropsType} from "./DialogsContainer";
import DialogItem from "./DialogsItem/DialogItem";
import Message
    //  { myMessageType } 
    from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type myDialogsDataType = {
    id: number
    name: string
    src: string
}
// type NewDialogsPageType = {
//     dialogs: myDialogsDataType[]
//     messages: myMessageType[]
//     newDialogsMessage: string
//     answerMessages: myMessageType[]
// }

// export type dialogsPageType = {
//     dialogsData: NewDialogsPageType
//     addMessage: () => void
//     updateNewMessageText: (newMessage: string) => void
//     // dispatch: (
//     //     action: AllActionType
//     // ) => void
// }

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

    // let refLinkToTextarea = React.createRef<HTMLTextAreaElement>()

    const addValueTextarea = () => {
        // addMessage()
        // dispatch(addMessageActionCreater())
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // const text = refLinkToTextarea.current?.value ? refLinkToTextarea.current.value : " "
        const text = e.currentTarget ? e.currentTarget.value : " "
        // updateNewMessageText(text)
        // dispatch(updateNewMessageTextActionCreater(text))
    }
    // if(!props.isAuth ) {
    //     return <Redirect to ={"./login"}/>
    // }
    const addNewMessage = (values: any) => {
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

type AddMessageFormType = {
    value: string
    onChange: () => void
}

const AddMessageForm: React.FC<any> = (props) => {
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
            <SuperButton onClick={props.addValueTextarea}>Add</SuperButton>
        </form>
    )
}

const AddMessageFormRedax = reduxForm<any>({
    form: "dialogAddMessageForm"
})(AddMessageForm)


export default Dialogs


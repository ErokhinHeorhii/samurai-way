import React from 'react'
import s from './MyPost.module.css'
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {Textarea} from "../../components/common/formControls/FormControls";
import Message from "./Post/Message";
import avatar from '../../assets/images/avatarProfile.jpg'
import SuperButton from "../../SuperButton/SuperButton";
import {useDispatch} from "react-redux";

export type myPostType = {
    id: string
    message: string
    likeCount: number
}

type NewPostDataTypeForReduser = {
    posts: myPostType[]
}

type FormDataType = {
    newPostText: string
}

export type postDataType =
    NewPostDataTypeForReduser &
    {
        posts: myPostType[]
        addPost: (newPostText: string) => void
    }

const MyPost = React.memo((props: postDataType) => {
    const {
        posts,
        addPost,
    } = props
    const dispatch = useDispatch()
    let postsElements = posts.map(item => {
        return <Message
            key={item.id}
            avatar={avatar}
            message={item.message}
            likeCounts={item.likeCount}
        />
    })

    const onAddPost = (values: FormDataType) => {
        addPost(values.newPostText)
        dispatch(reset('ProfileAddNewPostForm'))
    }

    return (
        <div className={s.postsBlock}>
            <h3>My Post </h3>
            <AddPostRedaxForm onSubmit={onAddPost}/>
            <div>
                {postsElements}
            </div>
        </div>
    )
});

const maxLength20 = maxLengthCreator(20)

const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    //Внутри  функции handleSubmit происходит  отмена действий по умолчанию;
    //         все данные упаковывает в обьект;
    //         props.OnSubmit(formData)

    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name="newPostText" placeholder="post message"
                   component={Textarea} validate={[requiredField, maxLength20]} style={{width: '200px', resize: 'none'}}
            ></Field>
        </div>
        <div>
            <SuperButton>Add</SuperButton>
        </div>
    </form>;
}

const AddPostRedaxForm = reduxForm<FormDataType>({
    form: "ProfileAddNewPostForm"
})(AddNewPostForm)

export default MyPost

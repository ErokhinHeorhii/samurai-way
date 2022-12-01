import React from 'react'
import s from './MyPost.module.css'
import Post from './Post/Post'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {Textarea} from "../../components/common/formControls/FormControls";

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


const MyPost = (props: postDataType) => {

    const {
        posts,
        addPost,
    } = props

    let postsElements = posts.map(item => {
        return <Post
            key={item.id}
            message={item.message}
            likeCounts={item.likeCount}
        />
    })

    const onAddPost = (values: FormDataType) => {
        addPost(values.newPostText)
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
}
 const maxLength20=maxLengthCreator(20)

const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    //Внутри  функции handleSubmit происходит  отмена действий по умолчанию;
    //         все данные упаковывает в обьект;
    //         props.OnSubmit(formData)
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name="newPostText" placeholder="post message"
                   component={Textarea} validate={[requiredField,maxLength20]}
            ></Field>
        </div>
        <div>
            <button>Add</button>
        </div>
    </form>;
}

const AddPostRedaxForm = reduxForm<FormDataType>({
    //даем уникальное имя форме
    form: "ProfileAddNewPostForm"
})(AddNewPostForm)

export default MyPost
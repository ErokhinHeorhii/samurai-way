import React from 'react'
import s from './MyPost.module.css'
import Post from './Post/Post'
import {Field, reduxForm} from "redux-form";

export type myPostType = {
    id: number
    message: string
    likeCount: number
}

type NewPostDataTypeForReduser = {
    posts: myPostType[]
    // newPostText: string
}

export type postDataType =
    NewPostDataTypeForReduser &
    {
        posts: myPostType[]
        // newPostText: string
        addPost: (newPostText:string) => void
        // updateNewPostText: (newText: string) => void
        // dispatch: (action: AllActionType
        // ) => void
    }


const MyPost = (props: postDataType) => {

    const {
        posts,
        // newPostText,
        // dispatch,
        addPost,
        // updateNewPostText
    } = props

    let postsElements = posts.map(item => {
        return <Post
            key={item.id}
            message={item.message}
            likeCounts={item.likeCount}
        />
    })

    // let newPostElement = React.createRef<HTMLTextAreaElement>()

    const onAddPost = (values:any) => {
        addPost(values.newPostText)
        // dispatch(addPostActionCreater())
    }

    // const onPostChange = () => {
    //     let text = newPostElement.current ? newPostElement.current.value : " "
    //     updateNewPostText(text)
    //     // dispatch(updateNewPostTextActionCreater(text))
    // }

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

const AddPostRedaxForm = reduxForm<any>({
    //даем уникальное имя форме
    form: "ProfileAddNewPostForm"
})(AddNewPostForm)

function AddNewPostForm(props: any) {
    //Внутри  функции handleSubmit происходит  отмена действий по умолчанию;
    //         все данные упаковывает в обьект;
    //         props.OnSubmit(formData)
    return <form onSubmit={props.handleSubmit}>
        <div><Field name="newPostText" component={"textarea"}></Field>
            {/*<textarea ref={props.ref} onChange={props.onChange} value={props.value}></textarea>*/}
        </div>
        <div>
            <button>Add</button>
        </div>
    </form>;
}

export default MyPost
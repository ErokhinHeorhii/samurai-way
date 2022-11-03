import React from 'react'
import s from './MyPost.module.css'
import Post from './Post/Post'

export type myPostType = {
    id: number
    message: string
    likeCount: number
}

type NewPostDataTypeForReduser = {
    posts: myPostType[]
    newPostText: string
}

export type postDataType =
    NewPostDataTypeForReduser &
    {
        // posts: myPostType[]
        newPostText: string
        addPost: () => void
        updateNewPostText: (newText: string) => void
        // dispatch: (action: AllActionType
        // ) => void
    }

const MyPost = (props: postDataType) => {

    const {
        posts,
        newPostText,
        // dispatch,
        addPost,
        updateNewPostText
    } = props

    let postsElements = posts.map(item => {
        return <Post
            key={item.id}
            message={item.message}
            likeCounts={item.likeCount}
        />
    })

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const onAddPost = () => {
        addPost()
        // dispatch(addPostActionCreater())
    }

    const onPostChange = () => {
        let text = newPostElement.current ? newPostElement.current.value : " "
        updateNewPostText(text)
        // dispatch(updateNewPostTextActionCreater(text))
    }

  return (
    <div className={s.postsBlock}> My Post
      <div><textarea ref={newPostElement} onChange={onPostChange} value={newPostText}></textarea></div>
      <div><button className={s.button} onClick={onAddPost}>Add</button></div>
      <div>
        {postsElements}
      </div>
    </div>
  )
}
export default MyPost
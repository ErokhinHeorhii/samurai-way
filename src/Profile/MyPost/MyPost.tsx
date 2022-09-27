import React from 'react'
import { AddMessageType, AddPostActionType, UpdateNewMessageTextType, UpdateNewPostTextActionType } from '../../components/Redux/State'
import s from './MyPost.module.css'
import Post from './Post/Post'

export type myPostType = {
  id: number
  message: string
  likeCount: number
}

export type postDataType = {
  posts: myPostType[]
  newPostText: string
  // addPost: () => void
  // updateNewPostText: (newText: string) => void
  dispatch: (action: AddPostActionType |
    UpdateNewPostTextActionType |
    UpdateNewMessageTextType |
    AddMessageType
  ) => void
}

const MyPost = (props: postDataType) => {

  const { posts, newPostText } = props
  const { dispatch } = props

  let postsElements = posts.map(item => {
    return <Post key={item.id} message={item.message} likeCounts={item.likeCount} />
  })

  let newPostElement = React.createRef<HTMLTextAreaElement>()

  const onClickHandler = () => {
    // addPost()
    dispatch({ type: "ADD-POST" })
  }

  const onChangeHandler = () => {
    let text = newPostElement.current ? newPostElement.current.value : " "
    // updateNewPostText(text)
    dispatch({
      type: "UPDATE-NEW-POST-TEXT",
      newText: text,
    })
  }

  return (
    <div className={s.postsBlock}> My Post
      <div><textarea ref={newPostElement} onChange={onChangeHandler} value={newPostText}></textarea></div>
      <div><button className={s.button} onClick={onClickHandler}>Add</button></div>
      <div>
        {postsElements}
      </div>
    </div>
  )
}
export default MyPost
import React from 'react'
import { addPostActionCreater, updateNewPostTextActionCreater } from '../../components/Redux/ProfileReduser'
import {
  AllActionType,
} from '../../components/Redux/Store'
import s from './MyPost.module.css'
import Post from './Post/Post'

export type myPostType = {
  id: number
  message: string
  likeCount: number
}

export type NewPostDataTypeForReduser = {
  posts: myPostType[]
  newPostText: string
}

export type postDataType = NewPostDataTypeForReduser & {
  // posts: myPostType[]
  // newPostText: string
  // addPost: () => void
  // updateNewPostText: (newText: string) => void
  dispatch: (action: AllActionType
  ) => void
}

const MyPost = (props: postDataType) => {

  const { posts, newPostText, dispatch } = props

  let postsElements = posts.map(item => {
    return <Post key={item.id} message={item.message} likeCounts={item.likeCount} />
  })

  let newPostElement = React.createRef<HTMLTextAreaElement>()

  const onClickHandler = () => {
    // addPost()
    dispatch(addPostActionCreater())
  }

  const onChangeHandler = () => {
    let text = newPostElement.current ? newPostElement.current.value : " "
    // updateNewPostText(text)
    dispatch(updateNewPostTextActionCreater(text))
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
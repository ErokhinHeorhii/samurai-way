import React from 'react'
import { addPostActionCreater, updateNewPostTextActionCreater } from '../../components/Redux/ProfileReduser'
import {
  AllActionType,
} from '../../components/Redux/Store'
import MyPost from './MyPost'

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
  posts: myPostType[]
  newPostText: string
  dispatch: (action: AllActionType
  ) => void
}

const MyPostContainer = (props: postDataType) => {
  const { posts,
    dispatch, newPostText,
  } = props


  const addPost = () => {
    // addPost()
    dispatch(addPostActionCreater())
  }

  const onPostChange = (text: string) => {
    // let text = newPostElement.current ? newPostElement.current.value : " "
    // updateNewPostText(text)
    dispatch(updateNewPostTextActionCreater(text))
  }

  return (
    <MyPost updateNewPostText={onPostChange} addPost={addPost} posts={posts} newPostText={newPostText} />
  )
}
export default MyPostContainer
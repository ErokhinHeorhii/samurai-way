import React from 'react'
import s from './MyPost.module.css'
import Post from './Post/Post'

export type myPostType = {
  id: number
  message: string
  likeCount: number
}

export type postDataType = {
  posts: myPostType[]
  addPost: (postMessage: string )=>void
}

const MyPost = (props: postDataType) => {
  const { posts } = props
  let postsElements = posts.map(item => {
    return <Post key={item.id} message={item.message} likeCounts={item.likeCount} />
  })

  let newPostElement = React.createRef<HTMLTextAreaElement>()

  const onClickHandler = () => {
    if (newPostElement.current) {
      const text = newPostElement.current.value
     props.addPost(text)
    }
  }

  return (
    <div className={s.postsBlock}> My Post
      <div><textarea ref={newPostElement}></textarea></div>
      <div><button className={s.button} onClick={onClickHandler}>Add</button></div>
      <div>
        {postsElements}
      </div>
    </div>
  )
}
export default MyPost
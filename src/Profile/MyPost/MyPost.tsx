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
}

const MyPost = (props: postDataType) => {
  const { posts } = props
  let postsElements = posts.map(item => {
    return <Post key={item.id} message={item.message} likeCounts={item.likeCount} />
  })

  let newPostElement = React.createRef<HTMLTextAreaElement>()

  const onClickHandler = () => {
    // if (newPostElement.current) {
      let text = newPostElement.current?.value
      return alert(text)
    // }
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
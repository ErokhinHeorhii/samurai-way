import { isTemplateMiddle } from 'typescript'
import s from './MyPost.module.css'
import Post from './Post/Post'

const MyPost = () => {

  let postsData = [
    { id: 1, message: "Hi", likeCount: 10 },
    { id: 2, message: "How are you", likeCount: 2 },
    { id: 3, message: "yooo", likeCount: 4 },
    { id: 4, message: "byu", likeCount: 14 },
    { id: 5, message: "ouyy", likeCount: 2 },
    { id: 6, message: "kyy", likeCount: 0 },
    { id: 7, message: "byu", likeCount: 1 },
  ]

  let postsElements = postsData.map(item => {
    return <Post message={item.message} likeCounts={item.likeCount} />
  })

  return (
    <div className={s.postsBlock}> My Post
      <div><textarea></textarea></div>
      <div><button className={s.button}>Add</button></div>
      <div>
        {postsElements}
      </div>
    </div>
  )
}
export default MyPost
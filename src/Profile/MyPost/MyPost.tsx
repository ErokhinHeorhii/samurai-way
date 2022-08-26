import s from './MyPost.module.css'
import Post from './Post/Post'

const MyPost = () => {

  let postsData = [
    { id: 1, message: "Hi", likeCount: 10 },
    { id: 2, message: "How are you", likeCount: 2 },
    { id: 3, message: "yooo", likeCount: 4 },
    { id: 4, message: "byu", likeCount: 14 },
  ]

  return (
    <div className={s.postsBlock}> My Post
      <div><textarea></textarea></div>
      <div><button className={s.button}>Add</button></div>
      <div>
        <Post message="How are you" likeCounts="15" />
        <Post message="Find, and you" likeCounts="20" />
        <Post message="Not bad" likeCounts="15" />
        <Post message="How are you" likeCounts="15" />
      </div>
    </div>
  )
}
export default MyPost
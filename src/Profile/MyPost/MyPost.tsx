import s from './MyPost.module.css'
import Post from './Post/Post'

const MyPost = () => {
  return (
    <div>
      <textarea></textarea>
      <button className={s.button}>Add</button>
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
import s from './MyPost.module.css'
import Post from './Post/Post'

type myPostType={
  id:number
  message:string
  likeCount:number
}

type postDataType={
  postsData:myPostType[]
}

const MyPost = (props:postDataType) => {
  const postsData=props.postsData

  let postsElements = postsData.map(item => {
    return <Post  key={item.id} message={item.message} likeCounts={item.likeCount} />
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
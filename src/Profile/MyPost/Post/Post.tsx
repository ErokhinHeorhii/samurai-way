import s from './Post.module.css'

type PostType={
message:string
likeCounts:string
}

const Post = (props:PostType) => {
  return (

    <div>
      <div className={s.item}>
        <img className={s.image} src="https://klike.net/uploads/posts/2019-03/1551511823_2.jpg" alt="img"></img>
        {props.message}</div>
      <div>
        <span>like {props.likeCounts} </span>
      </div >
    </div>
  )
}
export default Post
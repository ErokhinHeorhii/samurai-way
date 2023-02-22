import s from './Post.module.css'
import like from '../../../assets/images/like.jpg'
type PostType = {
  message: string
  likeCounts: string| number
}

function Post(props: PostType) {
    return (

        <div>
            <div className={s.item}>
                <img className={s.image} src="https://klike.net/uploads/posts/2019-03/1551511823_2.jpg"
                     alt="img"></img>
                <div className={s.itemMessage}>{props.message}</div>
            </div>
            <div className={s.likeItem}>
                <span>
                    <img src={like} alt={"img"} className={s.imgLike}></img>
                    {props.likeCounts} </span>
            </div>
        </div>
    )
}

export default Post

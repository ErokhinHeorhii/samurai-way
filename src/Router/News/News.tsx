import s from './News.module.css'
import img from '../../assets/images/news.jpg'

const News = () => {
  return (
    <div>
      <img src ={img} alt={img} className={s.img}/>
    </div>
  )
}
export default News;

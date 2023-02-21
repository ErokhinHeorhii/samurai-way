import img from "../../assets/images/music.jpg";
import s from "../News/News.module.css";


const Music = () => {
  return (
    <div>
      <img src ={img} alt={img} className={s.img}/>
    </div>
  )
}
export default Music;

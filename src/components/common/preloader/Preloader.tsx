import preloader from "../../../assets/images/preloader.gif"
import s from "../../Users/Users.module.css"

const Preloader = (props:any) => {
  return (<div className={s.wrapperImageLoader}>
    <img src={preloader} alt="loading" className={s.imageLoader} />
  </div>)
}

export default Preloader
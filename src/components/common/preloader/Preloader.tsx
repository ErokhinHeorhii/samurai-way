import preloader from "../../../assets/images/XOsX.gif"
import s from "../../Users/Users.module.css"

const Preloader = () => {
  return (<div className={s.wrapperImageLoader}>
    <img src={preloader} alt="loading" className={s.imageLoader} />
  </div>)
}

export default Preloader

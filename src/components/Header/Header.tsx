import style from './Header.module.css';
import {NavLink} from "react-router-dom";
import {HeaderPropsType} from "./HeaderContainer";
import img from '../../assets/images/imgForHeader.jpg'

const Header = (props: HeaderPropsType) => {
    return (
        <header className={style.header}>
            <img
                src={img}
                width="60px" height="60px" alt="img"></img>
            <div className={style.login}>
                {props.isAuth
                    ?<div style ={{display:"flex", alignItems:"center"}}>
                    <div className={style.auth}>{props.login}
                    </div>
                    <button className={style.button} onClick={props.loginOutThunkCreator}>
                        Log Out
                    </button>
                    </div>
                    : <NavLink className={style.navLink} to={"./login"}> Login </NavLink>}
            </div>
        </header>

    )
}
export default Header

import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'

export type mySideBar = {
  avatarSrc: string
  name: string
}

export type sideBarPageType = {
  sideBar: {
    sideBar: mySideBar[]
  }
}

const Navbar = (props: sideBarPageType) => {

  const { sideBar } = props.sideBar

  const newSideBar = sideBar.map(item => {
    return (<div className={s.itemFriends}>
      <img className={s.imgFriends} alt="img" src={item.avatarSrc}></img>
      <div className={s.nameFriends} >{item.name}</div>
    </div>)
  })

  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" activeClassName={s.activeLink}> News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" activeClassName={s.activeLink}>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/setting" activeClassName={s.activeLink}>Setting</NavLink>
        <div className={s.friends}>Friends
          <div className={s.wrapperFriends}>
            {newSideBar}
          </div>
        </div>
      </div>
    </nav>)
}
export default Navbar;
import avatar from "../../assets/images/avatar.png"
import axios from "axios"
import React from "react"
import s from "./Users.module.css"
import { UsersPropsType } from "./UsersContainer"


export class Users extends React.Component<UsersPropsType> {
  constructor(props: UsersPropsType) {
    super(props)
      // if (this.props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
          .then(res => {
            this.props.setUsers(res.data.items)
          })
      // }
    
  }
  render() {
    return <div>
      {/* <button onClick={()=>{}}>Get Users</button> */}
      {this.props.users.map(item => {
        return <div key={item.id} className={s.wrapperItem}>
          <div className={s.wrapperImageButton}>
            <div className={s.wrapperImage}>
              <img className={s.image} src={item.photos.small !== null ? item.photos.small : avatar} alt="img" />
            </div>
            <div>
              {
                item.foollowed
                  ? <button onClick={() => this.props.unFollow(item.id)}> Unfollow</button>
                  : <button onClick={() => this.props.follow(item.id)}> Follow </button>
              }
            </div>
          </div>
          <div className={s.wrapperDialog}>
            <div className={s.wrapperName}>
              <span>{item.name}! {item.status} </span>
              <div className={s.text} >{item.message}</div>
            </div>
            <div className={s.wrapperContry}>
              <div>{"item.location.city"}, </div >
              <div>{"item.location.contry"}</div>
            </div>
          </div>
        </div>
      })}
    </div>
  }
}

export default Users
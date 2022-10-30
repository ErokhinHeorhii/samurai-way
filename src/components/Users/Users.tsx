import React from "react"
import s from "./Users.module.css"
import avatar from "../../assets/images/avatar.png"
import { UsersType } from "../Redux/UsersReduser"
type NewUsersPropsType = {
  onPageChanged: (pageNumber: number) => void
  totalUsersCount:number
  pageSize:number
  currentPage:number
  users:Array<UsersType>
  follow:(userId: number)=>void
  unFollow:(userId: number)=>void
}


const Users = (props: NewUsersPropsType) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
  let pagesArr = []
  for (let i = 1; i <= pagesCount; i++) {
    pagesArr.push(i)
  }

  return (
    <div>
      <div className={s.wrapperPage}> pages:
        {pagesArr.map((item, index) => {
          return <span key={index} className={props.currentPage === item ? s.selectedPage + " " + s.page : s.page}
            onClick={(e) => { props.onPageChanged(item) }}>
            {item}
          </span>
        }
        )}
      </div>
      {/* <button onClick={()=>{}}>Get Users</button> */}
      {
        props.users.map(item => {
          return <div key={item.id} className={s.wrapperItem}>
            <div className={s.wrapperImageButton}>
              <div className={s.wrapperImage}>
                <img className={s.image} src={item.photos.small !== null ? item.photos.small : avatar} alt="img" />
              </div>
              <div>
                {
                  item.foollowed
                    ? <button onClick={() => props.unFollow(item.id)}> Unfollow</button>
                    : <button onClick={() => props.follow(item.id)}> Follow </button>
                }
              </div>
            </div>
            <div className={s.wrapperDialog}>
              <div className={s.wrapperName}>
                <span>{item.name} {item.status} </span>
                <div className={s.text} >{item.message}</div>
              </div>
              <div className={s.wrapperContry}>
                <div>{"item.location.city"}, </div >
                <div>{"item.location.contry"}</div>
              </div>
            </div>
          </div>
        })
      }
    </div >)
}

export default Users
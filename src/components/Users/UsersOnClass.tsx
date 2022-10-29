import avatar from "../../assets/images/avatar.png"
import axios from "axios"
import React from "react"
import s from "./Users.module.css"
import { UsersPropsType } from "./UsersContainer"


export class Users extends React.Component<UsersPropsType> {
  constructor(props: UsersPropsType) {
    super(props)

    // if (this.props.users.length === 0) {
    // axios.get('https://social-network.samuraijs.com/api/1.0/users')
    //   .then(res => {
    //     this.props.setUsers(res.data.items)
    //   })
    // }

  }
  // метод вызывается после вмонтирования компоненты в DOM

  componentDidMount(): void {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then(res => {
        this.props.setUsers(res.data.items)
        this.props.setTotalUsersCount(Math.ceil(res.data.totalCount / 220))
      })
  }

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then(res => {
        this.props.setUsers(res.data.items)
      })
  }

  render() {
    console.log(this.props)
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
    let pagesArr = []
    for (let i = 1; i <= pagesCount; i++) {
      pagesArr.push(i)
    }
    console.log(pagesArr)


    return <div>
      <div className={s.wrapperPage}> pages:
        {pagesArr.map(item =>
          <span className={this.props.currentPage === item ? s.selectedPage + " " + s.page : s.page}
            onClick={(e) => { this.onPageChanged(item) }}>
            {item}
          </span>
        )}

      </div>
      {/* <button onClick={()=>{}}>Get Users</button> */}
      {
        this.props.users.map(item => {
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
        })
      }
    </div >
  }
}

export default Users
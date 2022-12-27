import React from "react";
import s from "./Pagination.module.css"

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
}

export const Pagination = (props: PropsType) => {

    const {totalUsersCount, pageSize, currentPage, onPageChanged} = props

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pagesArr = []
    for (let i = 1; i <= pagesCount; i++) {
        pagesArr.push(i)
    }
    return (
        <div><h4 className={s.titlePage}>pages</h4>:
            {pagesArr.map((item, index) => {
                    return <span key={index}
                                 className={currentPage === item ? s.selectedPage + " " + s.page : s.page}
                                 onClick={(e) => {
                                     onPageChanged(item)
                                 }}>
            {item}
          </span>
                }
            )}
        </div>
    )
}
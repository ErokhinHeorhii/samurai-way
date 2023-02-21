import React, {useState} from "react";
import s from "./Pagination.module.css"
import classnames from 'classnames'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

export const Pagination = (props: PropsType) => {

    const {totalItemsCount, pageSize, currentPage, onPageChanged, portionSize} = props

    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pagesArr = []
    for (let i = 1; i <= pagesCount; i++) {
        pagesArr.push(i)
    }
    const [pageNumber, setPageNumber] = useState(Math.ceil(currentPage / portionSize))

    const portionCount = Math.ceil(pagesCount / portionSize)
    const leftPageNumber = (pageNumber - 1) * portionSize + 1
    const rightPageNumber = pageNumber * portionSize

    return (<div className={s.wrapperForPagination}>
            <h4 className={s.titlePage}>PAGES </h4>
            <div className={s.wrapperForCount}>
                {pageNumber > 1 && <button className={classnames(s.button,s.buttonLeft)} onClick={() => {
                    setPageNumber(pageNumber - 1)
                }}> </button>}
                <div className={s.wrapperForItem}>
                    {pagesArr
                        .filter(item => item >= leftPageNumber && item <= rightPageNumber)
                        .map((item, index) => {
                            return <span key={index}
                                         className={classnames(s.page,{[s.selectedPage]:currentPage === item })}
                                         onClick={(e) => {
                                             onPageChanged(item)
                                         }}>
            {item}
          </span>
                        })}
                </div>
                {portionCount > pageNumber && <button className={classnames(s.button,s.buttonRight)} onClick={() => {
                    setPageNumber(pageNumber + 1)
                }}>  </button>}
            </div>
        </div>
    )
}

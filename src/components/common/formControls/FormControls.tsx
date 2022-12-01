import React from "react"
import s from "./FormControl.module.css"


const FormControl  =(props:any)=>{

}
export const Textarea = (props: any) => {
    //необходимо достать их пропс input и другие неободимы пропсы и прокинуть в textarya
    const {input, meta, ...restProps} = props
    const isError =meta.touched && meta.error

    return (
        <div className={s.formControl+ " " + (isError? s.error : "")}>
            <div>
                <textarea {...input} {...restProps}/>
            </div>
            {  isError && <span className={s.spanError} >{meta.error}</span>}
        </div>
    )
}

export const Input = (props:any) => {
    //необходимо достать их пропс input и другие неободимы пропсы и прокинуть в textarya
    const {input, meta, ...restProps} = props
    const isError =meta.touched && meta.error

    return (
        <div className={s.formControl+ " " + (isError? s.error : "")}>
            <div>
                <input {...input} {...restProps}/>
            </div>
            {  isError && <span className={s.spanError} >{meta.error}</span>}
        </div>
    )
}
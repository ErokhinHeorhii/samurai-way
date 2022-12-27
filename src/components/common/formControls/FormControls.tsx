import React from "react"
import s from "./FormControl.module.css"
import {WrappedFieldProps} from "redux-form/lib/Field";

type  FormControlParamsType = {
    meta: {
        touched: boolean
        error?: string
    },
}
type  FormControlType = (params: FormControlParamsType) => React.ReactNode

const FormControl: React.FC<FormControlParamsType> = (props) => {
    const { meta:{touched, error}, children, ...restProps} = props
    const isError = touched && error

    return (
        <div className={s.formControl + " " + (isError ? s.error : "")}>
            <div>
                {children}
            </div>
            {isError && <span className={s.spanError}>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    //необходимо достать их пропс input и другие неободимы пропсы и прокинуть в textarya
    const {input, meta,  ...restProps} = props
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>
    )
}

export const Input = (props: any) => {
    //необходимо достать их пропс input и другие неободимы пропсы и прокинуть в textarya
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>
    )
}
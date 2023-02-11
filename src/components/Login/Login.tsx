import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/formControls/FormControls";
import {maxLengthCreator, requiredField, validateEmail} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../Redux/HeaderAuthReducer";
import {Redirect} from "react-router-dom";
import {AllAppStateType} from "../Redux/RedaxStore";
import s from "../common/formControls/FormControl.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type PropsType = {
    captcha: string
}

type MapStateToPropsType = {
    isAuth: boolean
    captcha: string
}
type MapDispatchToPropsType = {
    loginThunkCreator: (email: string, password: string, rememberMe: boolean, captcha:string) => void
}

const mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha!
    }
}
export type LoginPropsType = MapDispatchToPropsType & MapStateToPropsType

const maxLength25 = maxLengthCreator(25)

const LoginForm: React.FC<InjectedFormProps<FormDataType, PropsType> & PropsType> = ({
                                                                                         handleSubmit,
                                                                                         error,
                                                                                         captcha,
                                                                                         ...restProps
                                                                                     }) => {
    /*handleSubmit doing:
    e.preventDefault
    * get all form data put them to Object
    * props.onSubmit(formData)*/
    return <div style={{paddingLeft: "10px"}}>
        {/*handleSubmit берем с пропс, в ней прописано отмена действий по умолчанию;
        все данные упаковывает в обьект;
        props.OnSubmit(formData)*/}
        <form onSubmit={handleSubmit}>
            <div>
                {/*контейнерная компонента Field*/}
                <Field placeholder={"Login"}
                       name={"email"}
                       component={Input}
                       validate={[requiredField, validateEmail]}
                ></Field>
            </div>
            <div style={{paddingTop: "10px"}}>
                <Field placeholder={"Password"}
                       name={"password"}
                       type={"password"}
                       component={Input}
                       validate={[requiredField, maxLength25]}
                ></Field>
            </div>
            {captcha && <img className={s.img} src={captcha} alt={"img"}/>}
            {captcha && <Field placeholder={"CaptchaUrl"}
                             name={"captcha"}
                             component={Input}
                             validate={[requiredField, maxLength25]}
            ></Field>}
            { error && <div className={s.formError}>{error}</div>}
            <div style={{display: "flex", width: "180px", justifyContent: "space-between", paddingTop: "15px"}}>
                <div>
                    <Field component={"input"}
                           name={"rememberMe"}
                           type={"checkbox"}
                    ></Field> remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </div>
        </form>
    </div>
}

/*HOK для оборачивания LoginForm*/
const LoginRedaxForm = reduxForm<FormDataType, PropsType>({
    //даем уникальное имя форме
    form: "login"
})(LoginForm)

const Login = (props: LoginPropsType) => {
    const onSubmitHandler = (formData: FormDataType) => {
        props.loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1> Login</h1>
        {/*передаем onSumbit который выполняет handleSubmit() */}
        <LoginRedaxForm onSubmit={onSubmitHandler} captcha={props.captcha}/>
    </div>
}

export default connect(mapStateToProps, {loginThunkCreator})(Login)
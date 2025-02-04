import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/formControls/FormControls";
import {maxLengthCreator, requiredField, validateEmail} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../Redux/HeaderAuthReducer";
import {Redirect} from "react-router-dom";
import {AllAppStateType} from "../Redux/RedaxStore";
import s from "../common/formControls/FormControl.module.css"
import SuperButton from "../../SuperButton/SuperButton";

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
    loginThunkCreator: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha!
    }
}
export type LoginPropsType = MapDispatchToPropsType & MapStateToPropsType

const maxLength25 = maxLengthCreator(25)
const style = {width: "180px", height: "20px"}
const LoginForm: React.FC<InjectedFormProps<FormDataType,
    PropsType> & PropsType> = ({
                                   handleSubmit,
                                   error,
                                   captcha,
                                   ...restProps
                               }) => {
    /*handleSubmit doing:
    e.preventDefault
    * get all form data put them to Object
    * props.onSubmit(formData)*/
    return <div style={{paddingLeft: "10px", width: '200px'}} className={s.wrapperForLogin}>
        {/*handleSubmit берем с пропс, в ней прописано отмена действий по умолчанию;
        все данные упаковывает в обьект;
        props.OnSubmit(formData)*/}

        <form onSubmit={handleSubmit} style={{margin: '0 auto'}}>
            <div>
                <Field placeholder={"Login"}
                       name={"email"}
                       component={Input}
                       validate={[requiredField, validateEmail]}
                       style={style}
                ></Field>
            </div>
            <div style={{paddingTop: "10px"}}>
                <Field placeholder={"Password"}
                       name={"password"}
                       type={"password"}
                       component={Input}
                       validate={[requiredField, maxLength25]}
                       style={style}
                ></Field>
            </div>
            {captcha && <img className={s.img} src={captcha} alt={"img"}/>}
            {captcha && <Field placeholder={"CaptchaUrl"}
                               name={"captcha"}
                               component={Input}
                               validate={[requiredField, maxLength25]}
            ></Field>}
            {error && <div className={s.formError}>{error}</div>}
            <div style={{display: "flex", width: "185px", justifyContent: "space-between", paddingTop: "15px"}}>
                <div style={{color: "beige"}} >
                    <Field component={"input"}
                           name={"rememberMe"}
                           type={"checkbox"}
                    ></Field> remember me
                </div>
                <div style={{paddingLeft:'3px'}}>
                    <SuperButton>Login</SuperButton>
                </div>

            </div>
            <div className={s.password}>Email: free@samuraijs.com

                Password: free</div>
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
    return <div className={s.wrapperForLogin}>
        <h1 style={{textAlign: 'center', color: "beige"}}> Login</h1>
        {/*передаем onSumbit который выполняет handleSubmit() */}
        <LoginRedaxForm onSubmit={onSubmitHandler} captcha={props.captcha}/>
    </div>
}

export default connect(mapStateToProps, {loginThunkCreator})(Login)

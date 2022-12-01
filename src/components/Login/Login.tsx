import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/formControls/FormControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";

type FormDataType={
    login:string
    password:string
    rememberMe:boolean
}

const maxLength15=maxLengthCreator(15)
const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    /*handleSubmit doing:
    e.preventDefault
    * get all form data put them to Object
    * props.onSubmit(formData)*/
    return <div style={{paddingLeft: "10px"}}>
        {/*handleSubmit берем с пропс, в ней прописано отмена действий по умолчанию;
        все данные упаковывает в обьект;
        props.OnSubmit(formData)*/}
        <form onSubmit={props.handleSubmit}>
            <div>
                {/*контейнерная компонента Field*/}
                <Field placeholder={"Login"} name={"login"} component={Input} validate={[requiredField,maxLength15]}></Field>
            </div>
            <div style={{paddingTop: "10px"}}>
                <Field placeholder={"Password"} name={"password"} component={Input} validate={[requiredField,maxLength15]}></Field>
            </div>
            <div style={{display: "flex", width: "180px", justifyContent: "space-between", paddingTop: "15px"}}>
                <div>
                    <Field component={"input"} name={"rememberMe"} type={"checkbox"}></Field> remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </div>
        </form>
    </div>
}

/*HOK для оборачивания LoginForm*/
const LoginRedaxForm = reduxForm<FormDataType>({
    //даем уникальное имя форме
    form: "login"
})(LoginForm)

const Login = () => {
    const onSubmitHandler = (formData: FormDataType) => {
        console.log(formData)
    }
    return <div>
        <h1> Login</h1>
        {/*передаем onSumbit который выполняет handleSubmit() */}
        <LoginRedaxForm onSubmit={onSubmitHandler}/>
    </div>
}
export default Login
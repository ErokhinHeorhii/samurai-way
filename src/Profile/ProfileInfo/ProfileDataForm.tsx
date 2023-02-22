import s from './ProfileInfo.module.css'
import {ProfilePageType} from "../../components/Redux/ProfileReducer";
import avatarProfile from "../../assets/images/AvatarForProfile.jpg"
import React from "react";
import {Input, Textarea} from "../../components/common/formControls/FormControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type ProfileDataPropsType = {
    profile: ProfilePageType
    isOwner?: boolean
    goToEditMode?: () => void
}
export type FormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: {}
}
type ProfileDataFormType = InjectedFormProps<FormDataType, ProfileDataPropsType> & ProfileDataPropsType

const ProfileDataForm = ({profile, handleSubmit, error}: ProfileDataFormType) => {
    return (<form className={s.discriptionBlock} onSubmit={handleSubmit}>

        <div className={s.wrapperImage}>
            <img className={s.avatarImage} src={profile!.photos.small == null
                ? avatarProfile
                : profile!.photos.small} alt={"img"}/>
            <div className={s.button}>
                <button onClick={() => {
                }}>save
                </button>
            </div>
        </div>

        <div className={s.wrapperName}><b>Full Name</b>:
            <Field placeholder={"Full Name"}
                   name={"fullName"}
                   type={"text"}
                   component={Input}
                   validate={[]}
            ></Field>
            <div className={s.lookingJob}><b>Looking for Job</b>:
                <Field placeholder={"Looking for job"}
                       name={"lookingForAJob"}
                       type={"checkbox"}
                       component={Input}
                       validate={[]}
                ></Field>
            </div>

            <div className={s.lookingJob}>
                <b>Profession Skills</b>: <Field placeholder={"Profession Skills"}
                                                 name={"lookingForAJobDescription"}
                                                 component={Textarea}
                                                 validate={[]}
            ></Field>
            </div>
            <div className={s.lookingJob}>
                <b>About me</b>: <Field placeholder={"About me"}
                                        name={"aboutMe"}
                                        component={Textarea}
                                        validate={[]}
            ></Field>
            </div>
            <div className={s.lookingJob}>
                <b>Contacts</b>:{Object.keys(profile!.contacts)
                .map((item) =>
                        <div key={item}><b>{item}</b>:
                            <Field placeholder={item}
                                   name={"contacts." + item}
                                   type={"text"}
                                   component={Input}
                                   validate={[]}
                            ></Field>

                        </div>
                             )
            }
                {error && <div className={s.formError}>{error}</div>}
            </div>
        </div>
    </form>)
}

const ProfileProfileDataFormReduxForm = reduxForm<FormDataType, ProfileDataPropsType>({form: "edit-profile"})(ProfileDataForm)

export default ProfileProfileDataFormReduxForm

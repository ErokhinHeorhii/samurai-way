import axios from "axios";
import {UsersType} from "../components/Redux/UsersReducer";
import {ProfilePageType} from "../components/Redux/ProfileReducer";
import {FormDataType} from "../Profile/ProfileInfo/ProfileDataForm";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "f3e0224e-c3b3-4350-8aca-c2b6191bc369"},
    withCredentials: true
})

export const userApi = {

    getUsers: (currentPage = 1, pageSize = 5) => {
        return instance.get<ResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                return res.data
            })
    },

    unFollow: (itemId: number) => {
        return instance.delete(`follow/${itemId}`)
    },

    follow: (itemId: number) => {
        return instance.post(`follow/${itemId}`, {})
    },

    getProfile: (userId: string) => {
        return profileApi.getProfile(userId)
    },

    getAuth: () => {
        return instance.get <getAuthResponseType>(`auth/me`)
    },
}

export const profileApi = {
    getProfile: (userId: string) => {
        return instance.get<ProfilePageType>(`profile/${userId}`)
    },

    getStatus: (userId: string) => {
        return instance.get(`profile/status/${userId}`)
    },

    updateStatus: (status:string) => {
        return instance.put(`profile/status/`,{status})
    },

    savePhoto:(file:string)=>{
        const formData =new FormData()
        formData.append("image", file )
        return instance.put(`profile/photo/`, formData, {headers: {
            "Content-Type" : "multipart/form-data"
            }})
    },

    saveProfile:(formData:FormDataType)=>{
        return instance.put(`profile`, formData, )
    }
}

export const authApi = {
    login(email:string, password:string, rememberMe:boolean = false, captcha:string | null = null ){
        return instance.post(`auth/login`,{email, password, rememberMe, captcha})
    },
    logOut(){
        return instance.delete(`auth/login`)
    }
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get<{url:string}>(`security/get-captcha-url`)
    }
}
type ResponseType = {
    error: null,
    items: UsersType[],
    totalCount: number
}

type getAuthResponseType = {
    resultCode: number
    messages: [],
    data: {
        id: number,
        email: string,
        login: string
    }
}

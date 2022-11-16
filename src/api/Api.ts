import axios from "axios";
import {UsersType} from "../components/Redux/UsersReduser";
import {ProfilePageType} from "../components/Redux/ProfileReduser";


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
                console.log(res)
            })
    },

    unFollow: (itemId: number) => {
        return instance.delete(`follow/${itemId}`)
    },

    follow: (itemId: number)=>{
    return    instance.post(`follow/${itemId}`,{})},

    getProfile:(userId:string)=>{
     return   instance.get<ProfilePageType>(`profile/${userId}`)
    },

    getAuth:()=>{
        return  instance.get <getAuthResponseType>(`auth/me`)
    },
}

type ResponseType = {
    error: null,
    items: UsersType[],
    totalCount: number
}

type getAuthResponseType ={
    resultCode: number
    messages: [],
    data: {
        id: number,
        email: string,
        login: string
    }
}
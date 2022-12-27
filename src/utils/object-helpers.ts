import {UsersType} from "../components/Redux/UsersReducer";


export type UsersDomainType = {
    id?: number;
    photos?: {
        small: string | null;
        large: string | null;
    };
    followed?: boolean;
    name?: string;
    status?: string;
    uniqueUrlName?: null | string
}
type Keys = keyof UsersDomainType;

 export const updateObjectInArray =(items:UsersType[],itemId:number, objPropName:Keys,
                       newObjProps:UsersDomainType)=>{
 return items.map((item) =>
    item[objPropName] === itemId
        ? {...item, ...newObjProps}
        : item
)}
export {}
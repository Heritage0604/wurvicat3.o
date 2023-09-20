import { atom } from "recoil";

type props={
  image:string;
  id:string
}

 export type AdminUser={
    firstName:string,
    lastName:string,
    phoneNumber?:string,
    userName:string,
    email:string,
    file?:props[],
    location?:string
}

const initialAdminUserState:AdminUser={
    firstName:"",
    lastName:"",
    phoneNumber:"",
    userName:"",
    email:"",
    location:""
}

export const adminUserState=atom<AdminUser>({
    key:"adminUserState",
    default:initialAdminUserState,
})
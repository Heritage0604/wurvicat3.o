import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";


export type props={
  image:string;
  id:number
}

export interface Projects{
    title:string;
    creatorId:string |null|undefined;
    createdAt?:Timestamp;
    imageURL?:props[];
    description:string;
    projectId?:string;
    id:string

}




const defaultProjectState:Projects = {
 title:"",
 creatorId:"",
 description:"",
 id:"",
 
     
}

export const projectState=atom<Projects>({
    key:"productState",
    default:defaultProjectState
})
import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";


export type props={
  image:string;
  id:number
}

export interface Product{
    name:string
    creatorId:string |null|undefined;
    category:string
    createdAt?:Timestamp;
    imageURL?:props[];
    description:string;
    productId?:string;
    price:any;
    id?:string

}




const defaultProductState:Product = {
 name:"",
 creatorId:"",
 category:"",
 description:"",
 productId:"",
 price:"",
 imageURL:[],
 id:""
 
     
}

export const productState=atom<Product>({
    key:"productState",
    default:defaultProductState
})
import { Flex,Image,Link,Text,Icon,Button } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import {toast} from "react-toastify" 
import { useRouter } from 'next/router';
import SingleCartContent from './SingleCartContent';
  import { doc, getDoc } from "firebase/firestore";
import { db } from '@/firebase/firebase';
import CheckOut from './CheckOut';

const CartContent = () => {


    const [myCart,setMyCart]=useState<any>([])
    const[searchCart,setSearchCart]=useState('')
    const[productData,setProductData]=useState<any>([])
    const router=useRouter()
    const[cartNumber,setCartNumber]=useState(0)
    const[checkCart,setCheckCart]=useState<string[] |string >([])
        const addToCart=(e:React.MouseEvent<SVGElement, MouseEvent>,product:any)=>{
        e.stopPropagation();
        const myStringCart=localStorage.getItem('myCart')
        try{
            if(myStringCart){
                const myArrayCart=myStringCart.split(',')
                myArrayCart.push(product.id)
                 const setData=localStorage.setItem('myCart',myArrayCart.join(' '))
                // localStorage.clear()
                getCartItems()
            }else{
                setMyCart([product.id])
                const setData=localStorage.setItem('myCart',product.id)

                getCartItems()
            }
            toast.success("Product Added to Cart",{position:"top-center",autoClose:1500,theme:"light"})
        }
        catch(e:any){
            toast.success("An Error Occured",{position:"top-center",autoClose:1500,theme:"light"})
        }
}

const removeFromCart=(id:any)=>{
        const myStringCart=localStorage.getItem('myCart')
        try{
                if(myStringCart){
                    

                    setProductData((prev:any)=>prev.filter((item:any)=>item.id !== id))
                   const newArray=myStringCart.split(' ')
                   const filteredArray=newArray.filter(item => item !== id)
                   const setData=localStorage.setItem('myCart',filteredArray.join(' '))
                   setCartNumber(myStringCart.split(' ').length)
                }
                toast.success("Product removed from cart",{position:"top-center",autoClose:1500,theme:"light"})
        }catch(e:any){
            toast.error("An Error Occured",{position:"top-center",autoClose:1500,theme:"light"})
        }

}

    const getProducts=async(productId:string)=>{
const docRef = doc(db, "products", productId );
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
const copiedObject={...docSnap.data(),id:docSnap.id}
  setProductData((prevData:any)=>[...prevData,copiedObject])
} else {
  // docSnap.data() will be undefined in this case
 
}
    }

const getCartItems=()=>{
    const myStringCart=localStorage.getItem('myCart')
    if(myStringCart){
        setMyCart(myStringCart.split(' '))
        setCartNumber(myStringCart.split(' ').length)
        myCart.map((cart:string)=>{
            getProducts(cart)
        })
    }
    else{
        setCheckCart('')
            setCartNumber(0)
    }
}


useEffect(()=>{
    getCartItems()
},[cartNumber])

  return (
<Flex justify='center' mb='10vh'>
           <Flex p='6'   mt={"5vh"} flexDir={{base:"column",lg:'row'}} align={{base:'center',lg:'flex-start'}} justify='center' width={"90%"} >
<Flex  className='max-w-5xl' align='center' flexDir={{base:"column"}}  mr={{base:'0',lg:'20px'}}    width='100%'  > 
{productData.map((Data:any,index:number)=>{
   
    return (
        <SingleCartContent key={index} removeFromCart={removeFromCart} id={Data.id} name={Data.name} price={Data.price} description={Data.description} 
        imageURL={Data.imageURL[0]}/>
    )
})}
</Flex>

{productData.length > 0 && (
    <CheckOut ProductData={productData}/>
)}

{productData.length == 0 && (
    <Flex position={'absolute'}>
        Add items to cart 
    </Flex>
)}

</Flex>
</Flex>
  )
}

export default CartContent
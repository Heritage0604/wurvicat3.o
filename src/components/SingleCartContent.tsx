import { Button, Flex, Icon, Image, Text,Box } from '@chakra-ui/react'
import React,{useEffect,useState} from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
  import { doc, getDoc } from "firebase/firestore";
import { db } from '@/firebase/firebase';
import { Product } from '@/atoms/Products';
import {toast} from "react-toastify" 


type Props={
    name:any;
    price:any;
    description:any;
    imageURL:any;
    removeFromCart:(id:any)=>void
    id:any
}
const SingleCartContent:React.FC<Props> = ({name,price,description,imageURL,id,removeFromCart}) => {
 const[amount,setAmount]=useState(1)
 const[data,setData]=useState<any>()
 const [loading,setLoading]=useState(true)
 const [myCart,setMyCart]=useState<any>([])
    const[searchCart,setSearchCart]=useState('')
    const[cartNumber,setCartNumber]=useState(0)
    const[checkCart,setCheckCart]=useState<string[] |string >([])

    const addAmount=()=>{
        setAmount((prev)=>prev+1)
    }
    const removeAmount=()=>{
        if(amount < 2){
            return
        }
        setAmount((prev)=>prev-1)
    }




  return (
 
            <Flex borderRadius='10' justify={'space-between'} mb='3vh' width='90%' border='1px solid gray'>
    <Flex>
        <Flex p='3' flexDir={'column'} >
            <Image mb={"2px"} height={"150px"} borderRadius={'10px'} objectFit={'contain'} width={'200px'} 
            src={imageURL.image} alt='socket'/>
                <Flex onClick={()=>removeFromCart(id)} cursor={'pointer'}  mt='5'  width='100%'  color='red.500' align='center'>
                    <Icon fontSize={'20px'} mr='5px' as={AiOutlineDelete}/>
                    <Text > REMOVE</Text>
                </Flex>
        </Flex>
        <Flex p='3' flexDir='column'>
            <Text fontWeight={600} fontSize={'20px'} mb='10px'>{name}</Text>
            <Box _groupHover={{color:'orange.500'}} width={"90%"} fontSize='15px' color='gray'  overflow='hidden' dangerouslySetInnerHTML={{__html:`${description.slice(0,100)}...`}} />
        </Flex>
    </Flex>
    <Flex p='3'  flexDir='column' mr='10'>
         <Text textAlign={'center'} mb='7px'  color='orange.500'fontWeight={600} fontSize={"18px"}>&#8358; {price.includes(".") ?`${price}`  :`${price}.00`}</Text>
        <Flex  align='center' width='100%' >
            <Button onClick={removeAmount} _hover={{bg:amount < 2 ? 'gray.200':'orange.500'}} bg={amount < 2 ? 'gray.200':'orange.400'} fontSize={'20px'} >-</Button>
            <Text mr='5' ml='5'>{amount}</Text>
            <Button onClick={addAmount} _hover={{bg:'orange.500'}} bg='orange.400'>+</Button>
        </Flex>
    </Flex>
</Flex>

  )
}

export default SingleCartContent
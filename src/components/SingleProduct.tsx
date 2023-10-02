import { Product } from '@/atoms/Products';
import { Flex, Text,Image, Button,Icon,Box } from '@chakra-ui/react';
import React,{useState,useEffect} from 'react';
import { BiHeart } from "react-icons/bi";
import {useRouter} from "next/router"
import OtherProducts from './OtherProducts';

type SingleProductProps = {
    productData:Product
};

const SingleProduct:React.FC<SingleProductProps> = ({productData}) => {
    const[showImg,setShowImg]=useState(0)
    const router=useRouter()


      useEffect(()=>{
setShowImg(0)
  },[router.query.id])
  
    return(
 <Flex flexDir='column'>
            <Flex flexDir={{base:"column",lg:'row'}} align={{base:'center',lg:'flex-start'}} justify='center' width={"100%"} >
                <Flex  width={{base:"90%",lg:'55%'}} borderRadius='10px' p='6' mt={"10vh"} bg='white' boxShadow="md">
                 <Flex   width={'100%'}   className='select-none' flexDir={{base:"column",lg:"row"}}>
                    <Image  objectFit={'cover'} width={{base:"100%",lg:"350px"}} height={"300px"} src={productData.imageURL[showImg].image} alt='image'/>
           
   <Flex ml={{base:'0',lg:"10%"}} mt={"5vh"}  width={{base:"70%",lg:"45%"}} flexDir={{base:'column'}}>
<Flex justify={'space-between'}   width='100%'>
        <Flex  mt={{base:"20px"}} flexDir='column'>
     <Text  fontSize={{base:'20px',lg:"25px"}} >{productData.name}</Text>
            <Text color='orange.500'fontWeight={600} fontSize={"19px"}>&#8358; {productData.price.includes(".") ?`${productData.price}`  :`${productData.price}.00`}</Text>
   </Flex>
   <Flex mt={{base:"30px"}}>
    <Icon _hover={{color:'#DD6B20'}} cursor='pointer' fontSize={'25px'} as={BiHeart}/>
   </Flex>
    </Flex>

 <Flex flexDir='column'>
           <Flex mt='20px'    width='100%'>
                {productData.imageURL.length > 1 && productData.imageURL.map((img,idx)=>{
                        return(
                            <Flex mr={{base:'15px',lg:'10px'}} onClick={()=>setShowImg(idx)} cursor={'pointer'} key={idx} borderRadius={'10px'} _hover={{border:showImg==idx ?'1px solid #DD6B20':'1px solid gray'}} border={showImg == idx ? '1px solid #DD6B20':"none"}>
                                <Image borderRadius='10px' width={'70px'} src={img.image}/>
                            </Flex>
                        )
                    })}                
   </Flex>
    <Button display={{base:'none',lg:'flex'}} width={'100%'}  mt='4vh' _hover={{bg:'orange.500'}} bg='orange.400'>Add to Cart</Button>
 </Flex>
        </Flex>
        <Button display={{base:'flex',lg:'none'}}  mt='4vh' _hover={{bg:'orange.500'}} bg='orange.400'>Add to Cart</Button>
                 </Flex>
                </Flex>



                <Flex mb={'5vh'} flexDir='column' ml={{base:"0",lg:"5%"}}  width={{base:"90%",lg:'30%'}} borderRadius='10px' p='6' mt={"10vh"} bg='white' boxShadow="md">
                    <Text borderBottom='1px solid #dce0e6' fontSize={'20px'} fontWeight={600} >Product Detials</Text>
                    <Box mt={'2vh'} dangerouslySetInnerHTML={{__html:productData.description}}/>
                </Flex>

                
            </Flex>


   <OtherProducts productData={productData}/>
 </Flex>
    )
}
export default SingleProduct;
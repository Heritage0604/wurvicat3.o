import { Flex,Image,Text,SimpleGrid,Grid,Link,Input,Box,Icon,Button } from '@chakra-ui/react'
import React,{useState,useEffect,useRef} from 'react'
import { query, orderBy, limit, collection, getDocs,where } from "firebase/firestore";  
import { db } from '@/firebase/firebase';
import { useRouter } from 'next/router';

type OtherProductsProps = {
    productData:any
};

const OtherProducts:React.FC<OtherProductsProps> = ({productData}) => {

    const[products,setProducts]=useState<any>([])
    const postQuery=query(collection(db,"products"),where("name", "!=", productData.name),limit(5))
    const router=useRouter()
   
    
    const getOtherPosts=async()=>{
        const postDocs=await getDocs(postQuery)
const posts=postDocs.docs.map((doc)=>({id:doc.id,...doc.data()}))
console.log(posts)
setProducts(posts)
    }

    useEffect(()=>{

getOtherPosts()

    },[router.query.id])

            const nextPage=(selectedProduct:any)=>{
// setProductItem(selectedProduct)
router.push(`/products/${selectedProduct.id}`)
    }
    
    console.log(products)
    return (
      <Flex p='6' bg='#e6e4df' justify='center' width='100%' mt='10vh'>
           <SimpleGrid   columns={{base:1,lg:3}} spacing={10} mt='5vh' className='max-w-5xl '    width='100%'    >
        {products.map((project:any,index:number)=>{
        
        return(
            <Flex cursor={'pointer'} key={index}  onClick={()=>nextPage(project)}   width='100%'  align='center'  flexDir='column'>
                <Flex boxShadow='md' rounded={'md'} bg='white' p='3' flexDir='column' align='center' width={{base:'80%',lg:'100%'}}>
                <Flex   width='100%'>
                    {project.imageURL.length>0 &&( <Image  mb={"2px"} height={"150px"} objectFit={'cover'} width={{base:'100%',lg:'100%'}} src={project.imageURL[0].image} alt={project.title}/>)}
                </Flex>
               <Flex width={'100%'}  flexDir='column'>
                 <Text   fontSize='18px' fontWeight={700} >{project.name}</Text>
                 <Box _groupHover={{color:'orange.500'}} width={"90%"} fontSize='15px' color='gray'  overflow='hidden' dangerouslySetInnerHTML={{__html:`${project.description.slice(0,50)}...`}} />
               </Flex>
                </Flex>
            </Flex>
        )
    })}
</SimpleGrid>
         </Flex>
    )
}
export default OtherProducts;
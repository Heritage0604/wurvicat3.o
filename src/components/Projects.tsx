import { Flex,Image,Text,SimpleGrid,Grid,Link,Input,Box,Icon } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import { Product, productState } from '@/atoms/Products';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BsFillCartPlusFill,BsCartCheckFill} from 'react-icons/bs'
import {toast} from "react-toastify" 

type ProjectsProps = {
    projectData:any
};

const Projects:React.FC<ProjectsProps> = ({projectData}) => {
     const[projects,setProjects]=useState(projectData)
     const[searchCart,setSearchCart]=useState('')
     const router=useRouter()
     console.log(projectData)

        const nextPage=(selectedProduct:Product)=>{
// setProductItem(selectedProduct)
router.push(`/projects/${selectedProduct.id}`)
    }


    return <Flex p='6'  mt={"5vh"} flexDir={{base:"column"}} align='center' justify='center' width={"100%"} >
<SimpleGrid   columns={{base:1,lg:2}} spacing={10} mt='5vh' className='max-w-5xl '   width='100%'    >
        {projects.map((project:any)=>{
        
        return(
<Link role='group' key={project.id} _hover={{}}>
            <Flex justify='space-between' width='100%'  cursor={'pointer'}  onClick={()=>nextPage(project)}   borderRadius={'10px'} boxShadow={'md'} p='6' >
               <Flex width={'50%'}  flexDir='column'>
                 <Text   fontSize='23px' fontWeight={700} >{project.title}</Text>
                 <Box _groupHover={{color:'orange.500'}} width={"90%"} fontSize='15px' color='gray'  overflow='hidden' dangerouslySetInnerHTML={{__html:`${project.description.slice(0,100)}...`}} />
               </Flex>
                {project.imageURL.length>0 &&( <Image  mb={"2px"} height={"150px"} objectFit={'cover'} width={{base:'50%',lg:'50%'}} src={project.imageURL[0].image} alt={project.title}/>)}
        </Flex></Link>
        )
    })}
</SimpleGrid>
    </Flex>
}
export default Projects;
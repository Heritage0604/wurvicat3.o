import { Flex,Text,Link,Button,Icon,Input,useDisclosure } from '@chakra-ui/react';
import React,{useState,useEffect} from 'react';
import {AiOutlinePlus} from "react-icons/ai"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { auth,db,storage } from '@/firebase/firebase';
import { collection,deleteDoc, getDocs,doc,serverTimestamp,Timestamp, query, where, orderBy } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
      import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { ref, deleteObject } from "firebase/storage";

import { BsPlus } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FiMoreHorizontal } from "react-icons/fi";
import { useRecoilState } from 'recoil';
import { projectState,Projects } from '@/atoms/Project';
import {toast} from "react-toastify" 

type ProductTableProps = {
    
};

const ProjectTable:React.FC<ProductTableProps> = () => {
  const[user,loading,error]=useAuthState(auth)
   const[projects,setProjects]=useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router =useRouter()
    const citiesRef = collection(db, "products");
     const[deleteProject,setDeleteProject]=useState<Projects>({
      title:"",
      id:"",
      creatorId:"",
      description:"",
     })
     const[name,setName]=useState("")
    const [editProject, setEditProject] = useRecoilState(projectState);

   

const nextPage=()=>{
    router.push('/admin/newprojects')
}

const getProjects = async () => {
    try {
      const productsQuery = query(
        collection(db, "projects"),
        where("creatorId", "==", user?.email),
        
      );
      const productDocs = await getDocs(productsQuery);
      const comments = productDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
     
      setProjects(comments as any);

    } catch (error: any) {
      console.log("getPostComments error", error.message);
    }
  
  };

  useEffect(() => {
  

    getProjects();
  }, [user]);


const onDeleteProject = async (project:any)=>{
setDeleteProject(project)
onOpen()
}
const deletingProject=async()=>{
  try{
  await deleteDoc(doc(db, "projects", deleteProject.id));
  onClose()
    setProjects((prev:any)=>prev.filter((item:any)=>item.id != deleteProject.id))

      
if(deleteProject.imageURL){
          deleteProject.imageURL.map(async (img:any)=>{
   const imageRef = ref(storage, `projects/${img.id}/image`);
     deleteObject(imageRef).then(() => {
  // File deleted successfully
}).catch((error:any) => {
  throw new Error('an erro occured')
 
});
     
})
}

 toast.success("Product Deleted Successfully",{position:"top-center",autoClose:1500,theme:"light"})
}catch(err:any){
toast.error("An Error Ocurred",{position:"top-center",autoClose:1500,theme:"light"})
console.log(err)
}
}

const onEditProject=async(project:any)=>{
setEditProject(project)
 router.push(`/admin/edit/project/${project.id}`)
}

    return <Flex   position='relative' mt={"20vh"} justify='center' align='center' >
<Flex mb={"10vh"} flexDirection='column' boxShadow='dark-lg' p='6' rounded='md' width={{base:"85%",md:"50%"}}>


    {/* addproduct button and search bar */}
<Flex justify={'space-between'} align='center'>
<Button onClick={nextPage} _hover={{bg:"blue.400"}} p={{base:"5",lg:"2"}} cursor='pointer' color='white' borderRadius={"10px"} bg={" blue.500"}>
     <Icon color='white' fontSize={'20px'} as={AiOutlinePlus}/> Add Projects
     </Button>
     <Input value={name} onChange={(e)=>setName(e.target.value)} borderRadius={'10px'} width={'60%'} ml={"20px"} placeholder='Search Projects'/>
</Flex>


{/* product table */}
<Flex  mt={"5vh"}>
<TableContainer height={"50vh"} overflowY={"scroll"} width={"100%"}  >
  <Table variant='simple'>
    <TableCaption>Projects from Wurvicat</TableCaption>
    <Thead>
      <Tr>
        <Th>Projects</Th>
        <Th>CreatedAt</Th>
        <Th isNumeric>Options</Th>
      </Tr>
    </Thead>
     <Tbody>
     
      {projects.filter((item:any)=>{
        return item.title.toLowerCase() ===""?item :item.title.toLowerCase().includes(name.toLowerCase())
      } ).map((project:any,index:any)=>{
        
        
        return(

            <Tr key={index}>
        <Td>{project.title.charAt(0).toUpperCase() + project.title.slice(1)}</Td>
        
            <Td >
          {new Date(project.createdAt.seconds *1000).toDateString()}
        </Td>
            <Td zIndex={1}   isNumeric>
                 <Menu>
  <MenuButton 
   px={4}
   fontSize={"20px"}
    py={2}
    bg={"transparent"}
    transition='all 0.2s'
    borderRadius='md'
    border="none"
    color="black"
    borderWidth='1px'
    _hover={{ bg: 'transparent' }}
    _expanded={{ bg: 'transparent' }}
   
    _focus={{  bg: 'transparent' }}
  as={Button}  leftIcon={<FiMoreHorizontal /> } >
  
  </MenuButton>
  <MenuList   zIndex={3}>
    <MenuItem onClick={()=>onEditProject(project)} color={"blue.400"}>Edit <Icon ml={"3px"} as={CiEdit}/></MenuItem>
    <MenuItem onClick={()=>onDeleteProject(project)} color={"red"} >Delete <Icon ml={"2px"} as={MdDeleteOutline}/></MenuItem>
    
  </MenuList>
</Menu>
        </Td>
        
      
      </Tr>
 
        )
    
      })}

    </Tbody>
 
  </Table>
</TableContainer>

</Flex>
<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete {deleteProject.title}</ModalHeader>
          <ModalBody>
<Flex>  Are you sure  you want to delete <Text ml={"4px"} fontWeight={"700"}>{deleteProject.title}</Text>  </Flex>
         <Text> Projects deleted can not be retrieved</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='red' onClick={deletingProject}  bg={"red.500"}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
</Flex>
    </Flex>
}
export default ProjectTable;
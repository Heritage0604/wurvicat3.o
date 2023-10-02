import { Button, Flex, Table, TableCaption,Icon, TableContainer,useDisclosure, Tbody, Td, Text, Th, Thead, Tr,Input } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { db ,auth, storage} from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {toast} from "react-toastify" 
import { getDoc,doc ,updateDoc,addDoc, arrayUnion,collection,getDocs, deleteField,Timestamp} from 'firebase/firestore';
import { FiMoreHorizontal } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci'
import {MdDeleteOutline} from "react-icons/md"
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
import {  deleteDoc } from "firebase/firestore";



const AdminTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[searchCat,setSearchCat]=useState('')
     const[addCat,setAddCat]=useState('')
      const[categories,setCategories]=useState<any>([])
        const [user, loading, error] = useAuthState(auth);
        const [deleteId,setDeleteId]=useState()
      

     const getCategories=async()=>{
const querySnapshot = await getDocs(collection(db, "admins"));
   const comments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));;
      setCategories(comments)
    

}

useEffect(()=>{
if(user){

 getCategories()
}

},[user,loading,error])

  const addCategory=async()=>{
    const data={
      createdAt:Timestamp.fromDate(new Date()),
    creatorId:user?.email,
    category:addCat
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(addCat)){
        alert('input value must be an email')
        return
    }
try{
const docRef = await addDoc(collection(db, "admins"),{
   createdAt:Timestamp.fromDate(new Date()),
    creatorId:user?.email,
    category:addCat
});
onClose()
setCategories((prev:any)=>[...prev,data])
setAddCat('')
toast.success("Admin Added Successfully",{position:"top-center",autoClose:1500,theme:"light"})
}catch(e:any){
toast.error("An Error Occured",{position:"top-center",autoClose:1500,theme:"light"})
}
  }


  const deleteAdmin=async(admin:any)=>{
try{
    setDeleteId(admin)
        setCategories((prev:any)=>prev.filter((item:any)=>item.id !== admin.id))
    await deleteDoc(doc(db, "admins", `${admin.id}`));
    toast.success("Admin deleted Successfully",{position:"top-center",autoClose:1500,theme:"light"})
}catch(error:any){
    toast.error("An Error Occured Try Refreshing Page",{position:"top-center",autoClose:1500,theme:"light"})
    console.log(error.message)
}
  }

  return (
    <Flex mt={"20px"} flexDir={"column"}  width={{base:"100%"}} position={'relative'} boxShadow='sm' p='6' rounded='md' bg='white'>
  <Flex mb='20px' justify='space-around'  align='center'>
    <Text fontSize={'20px'} fontWeight={600}>Admins</Text>
    <Input value={searchCat} onChange={(e)=>setSearchCat(e.target.value)} width={"150px"} placeholder='Search Admin'/>
    <Button onClick={onOpen} colorScheme='blue' >Add Admin</Button>
    </Flex>
    <TableContainer height={{base:"30vh"}} overflowY={"scroll"}>
  <Table variant='simple'>
    <TableCaption>Admins</TableCaption>
    <Thead>
      <Tr>
        <Th>Admin</Th>
        <Th>CreatedAt</Th>
        <Th isNumeric>Options</Th>
      </Tr>
    </Thead>
   <Tbody>
      {categories.filter((item:any)=>{
        return item.category.toLowerCase() ===""?item :item.category.toLowerCase().includes(searchCat.toLowerCase())
      } ).map((category:any,index:number)=>{
        
        
        return(

            <Tr key={index}>
        <Td>{category.category}</Td>
        
            <Td >
          {new Date(category.createdAt.seconds *1000).toDateString()}
        </Td>
            <Td   isNumeric>
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
     zIndex={1}
    _focus={{  bg: 'transparent' }}
  as={Button}  leftIcon={<FiMoreHorizontal /> } >
  
  </MenuButton>
  <MenuList>
    <MenuItem  color={"red"} onClick={()=>deleteAdmin(category)} >Delete <Icon ml={"2px"} as={MdDeleteOutline}/></MenuItem>
    
  </MenuList>
</Menu>
        </Td>
        
      
      </Tr>
 
        )
    
      })}
    </Tbody>
  </Table>
</TableContainer>


     <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={()=>{
      onClose();setAddCat('')
     }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody  pb={6}>

<Input type='email' value={addCat} mb='4' onChange={(e)=>setAddCat(e.target.value)} placeholder='Email'/>
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=>{
              addCategory(); 
            }} colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={()=>{
              onClose();
              setAddCat('')

            }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
</Flex>
  )
}

export default AdminTable
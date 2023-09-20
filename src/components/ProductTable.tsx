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
import { productState } from '@/atoms/Products';


type ProductTableProps = {
    
};

const ProductTable:React.FC<ProductTableProps> = () => {
  const[user,loading,error]=useAuthState(auth)
   const[products,setProducts]=useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router =useRouter()
    const citiesRef = collection(db, "products");
     const[deleteProduct,setDeleteProduct]=useState<any>([])
     const[name,setName]=useState("")
    const [editProduct, setEditProduct] = useRecoilState(productState);

const nextPage=()=>{
    router.push('/admin/newproducts')
}

const getProducts = async () => {
    try {
      const productsQuery = query(
        collection(db, "products"),
        where("creatorId", "==", user?.email),
        
      );
      const productDocs = await getDocs(productsQuery);
      const comments = productDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
     
      setProducts(comments as any);

    } catch (error: any) {
      console.log("getPostComments error", error.message);
    }
  
  };

  useEffect(() => {
  

    getProducts();
  }, [user]);


const onDeleteProduct = async (product:any)=>{
setDeleteProduct(product)
onOpen()
}
const deletingProduct=async()=>{
  try{
  await deleteDoc(doc(db, "products", deleteProduct.id));
  onClose()
    setProducts((prevImage:any)=>prevImage.filter((item:any)=>item.id != deleteProduct.id))

      
        deleteProduct.imageURL.map(async (img:any)=>{
   const imageRef = ref(storage, `products/${img.id}/image`);
     deleteObject(imageRef).then(() => {
  // File deleted successfully
}).catch((error:any) => {
  // Uh-oh, an error occurred!
});
     
})

 
}catch(err){

}
}

const onEditProduct=async(product:any)=>{
setEditProduct(product)
 router.push(`/admin/edit/${product.id}`)
}

    return <Flex  position='relative' mt={"20vh"} justify='center' align='center' >
<Flex mb={"10vh"} flexDirection='column' boxShadow='dark-lg' p='6' rounded='md' width={{base:"85%",md:"50%"}}>


    {/* addproduct button and search bar */}
<Flex justify={'space-between'} align='center'>
<Button onClick={nextPage} _hover={{bg:"blue.400"}} p={{base:"5",lg:"2"}} cursor='pointer' color='white' borderRadius={"10px"} bg={" blue.500"}>
     <Icon color='white' fontSize={'20px'} as={AiOutlinePlus}/> Add Products
     </Button>
     <Input value={name} onChange={(e)=>setName(e.target.value)} borderRadius={'10px'} width={'60%'} ml={"20px"} placeholder='Search Products'/>
</Flex>


{/* product table */}
<Flex  mt={"5vh"}>
<TableContainer height={"50vh"} overflowY={"scroll"} width={"100%"}  >
  <Table variant='simple'>
    <TableCaption>Products from Wurvicat</TableCaption>
    <Thead>
      <Tr>
        <Th>Products</Th>
        <Th>CreatedAt</Th>
        <Th isNumeric>Options</Th>
      </Tr>
    </Thead>
     <Tbody>
     
      {products.filter((item:any)=>{
        return item.name.toLowerCase() ===""?item :item.name.toLowerCase().includes(name.toLowerCase())
      } ).map((product:any,index:any)=>{
        
        
        return(

            <Tr key={index}>
        <Td>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</Td>
        
            <Td >
          {new Date(product.createdAt.seconds *1000).toDateString()}
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
    <MenuItem onClick={()=>onEditProduct(product)} color={"blue.400"}>Edit <Icon ml={"3px"} as={CiEdit}/></MenuItem>
    <MenuItem onClick={()=>onDeleteProduct(product)} color={"red"} >Delete <Icon ml={"2px"} as={MdDeleteOutline}/></MenuItem>
    
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
          <ModalHeader>Delete {deleteProduct.name}</ModalHeader>
          <ModalBody>
<Flex>  Are you sure  you want to delete <Text ml={"4px"} fontWeight={"700"}>{deleteProduct.name}</Text>  </Flex>
         <Text> Products deleted can not be retrieved</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='red' onClick={deletingProduct}  bg={"red.500"}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
</Flex>
    </Flex>
}
export default ProductTable;
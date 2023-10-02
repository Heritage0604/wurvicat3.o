import React from 'react';
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
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,Icon,Button
} from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';

type CategoryTableProps = {
    categories:any
    userValue:any
};

const CategoryTable:React.FC<CategoryTableProps> = ({categories,userValue}) => {
    
const getCategories=async()=>{


const querySnapshot = await getDocs(collection(db, "categories"));
   const comments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));;
      setCategories(comments)
      console.log(comments)

}

    return(

<>
        {categories.map((category:any)=>{
  return(
          <Tr>
        <Td>{category.category}</Td>
        <Td>{category.createdAt}</Td>
        <Td isNumeric>{userValue.email && 
        (
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
    <MenuItem  color={"blue.400"}>Edit <Icon ml={"3px"} as={CiEdit}/></MenuItem>
    <MenuItem  color={"red"} >Delete <Icon ml={"2px"} as={MdDeleteOutline}/></MenuItem>
    
  </MenuList>
</Menu>
        )
        }</Td>
      </Tr>
  )
})}
</>

    )

}

export default CategoryTable;
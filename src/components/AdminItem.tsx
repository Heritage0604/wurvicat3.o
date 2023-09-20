import { Icon, Text,Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link'
import { useRouter } from 'next/router';

type AdminItemProps = {
    icon:any,
    text:string
};

const AdminItem:React.FC<AdminItemProps> = ({icon,text}) => {
    const router=useRouter()
    return (
         <Link bg={router.pathname== `/admin/${text.toLowerCase()}`
          ? "gray.100":"transparent"} as={NextLink} prefetch={true}
           href={`/admin/${text.toLowerCase()}`} color={router.pathname== `/admin/${text.toLowerCase()}`
          ? "black":"gray"}  
          p='2'borderRadius={'2px'} mt={"10px"}
           width={"100%"} _hover={{bg:'gray.100',color:'black'}}
             fontSize={{base:"17px",lg:'18px'}}  cursor='pointer'
              > <Icon as={icon} mr='10px'/>{text}</Link>
    )
}
export default AdminItem;
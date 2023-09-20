import React from 'react';
import { Flex,Text,Image,Link,Icon } from '@chakra-ui/react';
import {RiAdminFill} from "react-icons/ri"
import {FaUserCircle} from "react-icons/fa"
import {FaLocationDot} from "react-icons/fa6"
import {BsFillTelephoneFill} from "react-icons/bs"
import {MdEmail} from "react-icons/md"
type AdminComponentProps = {
    
};

const AdminComponent:React.FC<AdminComponentProps> = () => {
    
    return <Flex mb={{base:"5vh"}} mt={{base:"5vh",lg:"4vh"}} flexDir={'column'} p={{base:"0",lg:'4'}}  justify={{base:'center',lg:'flex-start'}} align={{base:'center',lg:'flex-start'}}  width={{base:"100%",lg:"30%"}}>
<Flex position={'relative'} align='center' width={{base:"85%",lg:"80%"}} boxShadow='sm' p='3' rounded='md' bg='white' flexDir='column'>
<Icon as={RiAdminFill} fontSize={"150px"}/>
<Text color={"purple"} mb='2'>Hello Admin</Text>
<Flex borderTop={'1px solid gray '} p={'2'}  width='100%' align='center' color={"gray"} ><Icon fontSize={"18px"} as={FaUserCircle} mr={"3"}/> <Text>Admin User 01</Text></Flex>
<Flex borderTop={'1px solid gray '} p='2'  width='100%' align='center' color={"gray"} > <Icon fontSize={"18px"} as={MdEmail} mr={"3"}/> <Text>wurvicat@gmail.com</Text></Flex>
<Flex borderTop={'1px solid gray '} p='2' width='100%' align='center' color={"gray"} ><Icon fontSize={"18px"} as={BsFillTelephoneFill} mr={"3"}/> <Text>08033848454</Text></Flex>
<Flex borderTop={'1px solid gray '} p='2' width='100%' align='center' color={"gray"} ><Icon fontSize={"16px"} as={FaLocationDot} mr={"3"}/> <Text color={"gray"}> 10,
Otunubi Street, College road,
Ogba-Ikeja Lagos state, Nigeria.</Text></Flex>

</Flex>

    </Flex>
}
export default AdminComponent;
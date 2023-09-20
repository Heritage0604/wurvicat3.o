'use client'

import { Flex,Icon,Text,Link,Image, useDisclosure, Button, Input } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import {GiHamburgerMenu } from "react-icons/gi";
import {FaEarthAfrica,FaLaptop } from "react-icons/fa6";
import {FaUserCircle,FaDollarSign,FaProjectDiagram} from "react-icons/fa";
import {IoNotifications} from "react-icons/io5";
import {BsFillCartFill} from "react-icons/bs";
import {useRouter} from "next/router"
import { useSignOut } from 'react-firebase-hooks/auth'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import AdminItem from './AdminItem';
import { auth } from '@/firebase/firebase';


const AdminNavbar = () => {
    const router=useRouter()
    const [signOut, loading, error] = useSignOut(auth);
     
    const { isOpen, onOpen, onClose } = useDisclosure()
 
  return (
<Flex bg={'gray.100'} >
    {/* <Flex className='h-screen' overflowY={'hidden'}  boxShadow='sm' p='6' rounded='md' bg='white'  width={"20vw"} display={{base:"none",md:"none",lg:"flex"}}>
        <Flex  width={"100%"} flexDir='column'>
            <Text p='2' mt={"10px"} fontSize={'20px'} width={"100%"} >Hi AdminUser</Text>

            <AdminItem text='Dashboard' icon={FaLaptop}/>
            <AdminItem text='Profile' icon={FaUserCircle}/>
            <AdminItem text='Products' icon={BsFillCartFill}/>
            <AdminItem text='Orders' icon={FaDollarSign}/>
        </Flex>
    </Flex> */}

     <Flex position={"relative"} flexDir='column' width={{base:"100vw",md:"100vw",lg:"100vw"}} >


    <Flex position='relative' width={"100%"} height={{base:"15vh",md:"15vh"}}  bg={"blue.500"}>
       <Flex align='center'  width={"100%"} justify={"space-between"}>
        <Flex   ml={"7%"}><Icon color={"white"} fontWeight={700} fontSize={"22px"} cursor={'pointer'}   onClick={onOpen} as={GiHamburgerMenu}/></Flex>
        <Flex justify='space-between' align='center' width={"200px"}  mr='7%'>
<Icon color={"white"} fontSize={'22px'} as={FaEarthAfrica}/>
<Icon color={"white"} fontSize={'22px'} as={IoNotifications}/>
<Icon color={"white"} fontSize={'22px'} as={FaUserCircle}/>
<Text color='white' fontSize='15px' fontWeight={400}>Hi, Admin User</Text>
        </Flex>
       </Flex>
    </Flex>

  <Flex width={'90%'} justify={'space-between'} top={{base:'120%',md:'125%',lg:"125%"}} left={"50%"} transform={'translate(-50%, -50%)'} boxShadow='dark-lg' p='6' rounded='md' bg='white' position='absolute' >
       <Text color='blue' fontSize={'20px'} fontWeight={700}>{router.pathname.toUpperCase()}</Text>
      
    </Flex>

    <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Hi AdminUser</DrawerHeader>

          <DrawerBody>
            <Flex  width={"100%"} flexDir='column'>

            <AdminItem text='Dashboard' icon={FaLaptop}/>
            <AdminItem text='Profile' icon={FaUserCircle}/>
            <AdminItem text='Products' icon={BsFillCartFill}/>
            <AdminItem text='Projects' icon={FaProjectDiagram}/>
            <AdminItem text='Orders' icon={FaDollarSign}/>
        </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
             variant='outline' colorScheme='red'
              mr={3} onClick={async () => {
          const success = await signOut();
          router.push('/')
          }}>
              Logout
            </Button>
            <Button onClick={onClose} colorScheme='blue'>Cancel</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
 </Flex>
</Flex>
  )
}

export default AdminNavbar
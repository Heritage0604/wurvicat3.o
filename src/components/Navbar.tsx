import React,{useState,useEffect} from 'react'
import {  Flex,Image,Text,Link  } from '@chakra-ui/react'
import { Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider,} from '@chakra-ui/react'
import { CgDetailsMore } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import {useRouter} from "next/router"
import NextLink from 'next/link'



const Navbar = () => {
    const [active,setactive]=useState("")
    const[toggle,setToggle]=useState(false)
    const router=useRouter()
    


// get the route of the page 
useEffect(()=>{
setactive(router.pathname)
},[router.pathname])

  return (
    <>
        <Flex  top={'6vh'}  justify={{base:"space-between",md:"space-around"}} align={"center"} height={{base:'14vh',md:"15vh"}}  >

          {/* the logo of the brand wurvicat */}
           <Flex ml={{base:"30px",md:"0px"}}>
            <Image bg={"orange.500"} src={'/wurvicat.png'} width={{base:"70px",md:'75px'}} alt="Wurvicat"/>
           </Flex>

           {/* for a large device sucah a laptop,monitor and tabs */}
            <Flex display={{base:"none",md:"flex"}} width={"55%"} justify="space-around" >
                <Link as={NextLink} prefetch={true} href="/" color={active=='/' ? "orange.500" :"black"} _hover={{color:"orange.500",transition: '0.4s'}} >HOME</Link>
                <Link  as={NextLink} prefetch={true} href="/about" color={active=='/about' ? "orange.500" :"black"} _hover={{color:"orange.500",transition: '0.4s'}}>ABOUT US</Link>
                <Link  as={NextLink} prefetch={true} href="/clients-partners" color={active=='/clients-partners'? "orange.500" :"black"} _hover={{color:"orange.500",transition: '0.4s'}}>CLIENTS & PARTNERS</Link>
                <Link  as={NextLink} prefetch={true} href="/services" color={active=='/services' ? "orange.500" :"black"} _hover={{color:"orange.500",transition: '0.4s'}}>SERVICES</Link>
                <Link  as={NextLink} prefetch={true} href="/projects" color={active=='/projects' ? "orange.500" :"black"} _hover={{color:"orange.500",transition: '0.4s'}}>OUR PROJECTS</Link>
                <Link  as={NextLink} prefetch={true} href="/contact" color={active=='/contact' ? "orange.500" :"black"} _hover={{color:"orange.500",transition: '0.4s'}}>CONTACT</Link>
              
            </Flex>

            {/* menu for a small device such as a phone */}
            <Flex mr={{base:"30px",md:"0px"}} display={{base:"flex",md:"none"}}>
              <Menu>
  <MenuButton
   px={4}
    py={2}
    bg={"transparent"}
    transition='all 0.2s'
    borderRadius='md'
    border="none"
    borderWidth='1px'
    _hover={{ bg: 'transparent' }}
    _expanded={{ bg: 'transparent' }}
    _focus={{  bg: 'transparent', outline:"none" }}
    fontSize={"40px"}
    onClick={()=>setToggle(!toggle)}

  >
    <CgDetailsMore  fontSize={'24px'}/> 
  </MenuButton>
  <MenuList>
  <Flex flexDirection={'column'}>
  <Link  as={NextLink} prefetch={true} pl={"10px"} pb={"4px"} href="/" color={active=='/' ? "orange.500" :"black"} _hover={{color:"orange.500",transition: '0.4s'}} >HOME</Link>
  <Link  as={NextLink} prefetch={true}  pl={"10px"} pb={"4px"} href="/about" color={active=='/about' ? "orange.500" :"black"} _hover={{color:"orange.500",transition: '0.4s'}}>ABOUT US</Link>
  
  <Link  as={NextLink} prefetch={true} pl={"10px"} pb={"4px"} href="/clients-partners" color={active=='/clients-partners'? "orange.500" :"black"} _hover={{color:"orange.500",transition: '0.4s'}}>CLIENTS & PARTNERS</Link>
      <Link  as={NextLink} prefetch={true} pl={"10px"} pb={"4px"} href="/services" color={active=='/services' ? "orange.500" :"black"} _hover={{color:"orange.500",transition: '0.4s'}}>SERVICES</Link>
  <Link  as={NextLink} prefetch={true} pl={"10px"} pb={"4px"} href="/projects" color={active=='/projects' ? "orange.500" :"black"} _hover={{color:"orange.500",transition: '0.4s'}}>OUR PROJECTS</Link>
  <Link  as={NextLink} prefetch={true} pl={"10px"} pb={"4px"} href="/contact" color={active=='/contact' ? "orange.500" :"black"} _hover={{color:"orange.500",transition: '0.4s'}}>CONTACT</Link>
  

  </Flex>
  </MenuList>
</Menu>
            </Flex>
        </Flex>
    </>
  )
}

export default Navbar
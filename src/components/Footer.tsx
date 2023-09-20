import { Flex,Text,Image, Link } from '@chakra-ui/react'
import React from 'react'


const Footer = () => {
  return (
    <Flex flexDirection={"column"} overflowX={'hidden'} bg={"orange.500"}>
   <Flex p={"10px"} overflowX={'hidden'}  flexDir={{base:"column",md:"row"}} justify={{base:"space-around"}} width={'100%'} mt={"10vh"} bg={"orange.500"}>

<Flex width={{base:"100%",md:"30%"}} ml={{base:"10%",md:"0%"}} flexDir={'column'}>
  <Text mt={"3vh"} fontSize={"3xl"} color='white'>ABOUT US</Text>
  <Image boxSize='100px' alt='wurvicat' src={"/wurvicat.png"}/>
  <Text  mr={"15%"} color={'white'} mt={"3vh"}> Wurvicat Intl. aims to
do business in the area of Construction, procurement and supply of a wide
range of electrical distribution materials, project management, consultancy
and other related engineering services.</Text>
<Link mt={"1vh"} href={'/about'} color='white' p={'10px'} _hover={{color:'white'}} width={"120px"} bg={'orange.500'}>Learn More...</Link>
   </Flex>
<Flex> </Flex>

<Flex  width={{base:"100%",md:"30%"}}  ml={'10%'} flexDir={'column'}>
<Text mt={"3vh"} fontSize={"3xl"} color='white'>CONTACT US</Text>
  <Text mt={"3vh"} color='white'>
    Office: WURVICAT HOUSE 10, <br/> Otunubi Street, College road, <br/> Ogba-Ikeja
Lagos state, Nigeria.
  </Text>
  <Flex flexDir={"column"}>
<Text  mt={"3vh"} color='white'>Telephone:
08033848454, 08024104821</Text>
<Text mb={{base:"5vh"}}   mt={"3vh"} color='white'>Email:
 wurvicat@gmail.com</Text>
</Flex>
</Flex>

   </Flex>
   <Flex justify={{base:"center",md:'space-between'}} align={"center"} flexDirection={{base:"column",md:"row"}} p={"10px"} bg={'orange.500'}>
  <Flex ml={{base:"0",md:"10%"}}>
    <Link href='/' mr={"5px"} color={"white"}  _hover={{color:"orange.500"}}>Home</Link> <Text color='white'>|</Text>
    <Link  href='/about'  ml={"5px"} mr={"5px"} color={"white"}  _hover={{color:"orange.500"}}>About</Link> <Text color='white'>|</Text>
    <Link  href='/services'  ml={"5px"} mr={"5px"} color={"white"}  _hover={{color:"orange.500"}}>Services</Link> <Text color='white'>|</Text>
    <Link  href='/contact'  ml={"5px"} mr={"5px"} color={"white"}  _hover={{color:"orange.500"}}>Contact</Link>
  </Flex>
  <Flex mr={{base:"0",md:'10%'}}>
    <Text textAlign={'center'} color={"white"}>Copyright 2023 Wurvicat International Limited. All Right Reserved. Powered By © Wurvicat </Text>
  </Flex>
   </Flex>
   </Flex>
  )
}

export default Footer
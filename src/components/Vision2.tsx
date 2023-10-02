import { Flex,Text,Image, ListItem, UnorderedList } from '@chakra-ui/react'
import React from 'react'
import dart from "../../public/dart.jpg"
import vision from "../../public/vision.jpg"
import value from "../../public/value.jpg"

const Vision2 = () => {
  return (
    <Flex mb={"5vh"} mt={"7vh"} width={"100%"} justify='center' >
<Flex flexDir={{base:"column",lg:"row"}} justify={{base:"center",lg:'space-between'}} align='center'  width={{base:"100%",md:"80%"}} >

     <Flex mb={{base:"3vh",md:"0"}} p={{base:"13px",md:"10px"}} width={{base:"90%",lg:"300px"}} flexDir={"column"} boxShadow='2xl'  rounded='md' bg='transparent' position='relative'  className=' overflow-x-hidden '>
        <Text ml={{base:"1vw",md:"0"}} mb={"1vh"} fontWeight={700} fontSize={"18px"} color='orange.500'>Our Vision</Text>
                    <Image borderRadius={'10px'}   className=' w-screen md:w-[300px] h-[200px]   overflow-x-hidden object-cover'    src={'/vision.jpg'} alt="image"/>
                    <Text mt={"2vh"}>We aim to be known nationwide as the leading supplier of high standard, quality, top OEM equipment to the
                         Power, Manufacturing and Oil & Gas sectors.</Text>
                </Flex>

     <Flex mb={{base:"3vh",md:"0"}} p={{base:"13px",md:"10px"}} width={{base:"90%",lg:"300px"}} flexDir={"column"} boxShadow='2xl'  rounded='md' bg='transparent' position='relative'  className=' overflow-x-hidden '>
        <Text ml={{base:"1vw",md:"0"}} mb={"1vh"} fontWeight={700} fontSize={"18px"} color='orange.500'>Our Mission</Text>
                    <Image borderRadius={'10px'}   className=' w-screen md:w-[300px] h-[200px]   overflow-x-hidden object-cover'    src={'/dart.jpg'} alt="image"/>
                    <Text mt={"2vh"}>We are committed to making a difference and keeping 
                    our fidelity by ensuring efficiency in delivering services to our 
                    clients while maintaining a good customer relationship.</Text>
                </Flex>

     <Flex p={{base:"13px",md:"10px"}} width={{base:"90%",lg:"300px"}} flexDir={"column"} boxShadow='2xl'  rounded='md' bg='transparent' position='relative'  className=' overflow-x-hidden '>
        <Text ml={{base:"1vw",md:"0"}} mb={"1vh"} fontWeight={700} fontSize={"18px"} color='orange.500'>Our CoreValues</Text>
                    <Image borderRadius={'10px'}   className=' w-screen md:w-[300px] h-[200px]   overflow-x-hidden object-cover'    src={'/value.jpg'} alt="image"/>
                    <UnorderedList mt={"2vh"}>
  <ListItem> Perseverance</ListItem>
  <ListItem>Reliability</ListItem>
  <ListItem>Quality</ListItem>
  <ListItem>Commitment</ListItem>

</UnorderedList>
                </Flex>

</Flex>


    </Flex>
  )
}

export default Vision2
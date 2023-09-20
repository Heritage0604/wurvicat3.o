import { Flex, Image,Text,SimpleGrid } from '@chakra-ui/react'
import React from 'react'

const ClientList = () => {
  return (
    <Flex mt={"10vh"} align={'center'} flexDir="column">
        <Flex flexDir="column" width={"80%"}>
<Text ml={"10vw"} fontSize={"30px"} fontWeight={700}>Meet Our Client Base</Text>
        <Flex ml={"10vw"} width={{base:"80%",md:"74%"}} borderTop="1px solid black"/>
<Flex mt={"3vh"} mb={"5vh"} ml={"10vw"}>
    <SimpleGrid  alignItems={'center'}   justifyItems={'center'}  display={{base:"grid",md:""}} columns={{base:2,md:3,lg:5}} spacing={3}>
    
     <Image border={"1px solid #e8edea "} boxShadow='lg' rounded='md' bg='white' borderRadius={'20px'} mt={"2vh"}   width={"150px"} height={"150px"} src={'/abuja.png'} alt="image"/>
     <Image src={'/benin.png'} border={"1px solid #e8edea "} boxShadow='lg' rounded='md' bg='white' borderRadius={'20px'} mt={"2vh"}   width={"150px"} height={"150px"}  alt="image"/>
     <Image src={'/dangote.webp'} border={"1px solid #e8edea "} boxShadow='lg' rounded='md' bg='white' borderRadius={'20px'} mt={"2vh"}   width={"150px"} height={"150px"}  alt="image"/>
     <Image src={'/ibadan.png'} border={"1px solid #e8edea "} boxShadow='lg' rounded='md' bg='white' borderRadius={'20px'} mt={"2vh"}   width={"150px"} height={"150px"}  alt="image"/>
     <Image src={'/ikeja.jpg'} border={"1px solid #e8edea "} boxShadow='lg' rounded='md' bg='white' borderRadius={'20px'} mt={"2vh"}   width={"150px"} height={"150px"}  alt="image"/>
     <Image src={'/jos.jfif'} border={"1px solid #e8edea "} boxShadow='lg' rounded='md' bg='white' borderRadius={'20px'} mt={"2vh"}   width={"150px"} height={"150px"}  alt="image"/>
     <Image src={'/opesel.png'} border={"1px solid #e8edea "} boxShadow='lg' rounded='md' bg='white' borderRadius={'20px'} mt={"2vh"}   width={"150px"} height={"150px"}  alt="image"/>
     <Image src={'/portharcout.png'} border={"1px solid #e8edea "} boxShadow='lg' rounded='md' bg='white' borderRadius={'20px'} mt={"2vh"}   width={"150px"} height={"150px"}  alt="image"/>
     <Image src={'/redeem.png'} border={"1px solid #e8edea "} boxShadow='lg' rounded='md' bg='white' borderRadius={'20px'} mt={"2vh"}   width={"150px"} height={"150px"}  alt="image"/>
     <Image src={'/transmission.jfif'} border={"1px solid #e8edea "} boxShadow='lg' rounded='md' bg='white' borderRadius={'20px'} mt={"2vh"}   width={"150px"} height={"150px"}  alt="image"/>
    
    </SimpleGrid>
</Flex>
        </Flex>
    </Flex>
  )
}

export default ClientList